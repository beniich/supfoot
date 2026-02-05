import { createClient } from '@/utils/supabase/client';

interface AuditEvent {
    organizationId?: string;
    userId?: string;
    userEmail?: string;
    userIp?: string;
    eventType: string;
    resourceType?: string;
    resourceId?: string;
    status: 'success' | 'failure';
    metadata?: Record<string, unknown>;
    requestId?: string;
    userAgent?: string;
}

class AuditService {
    private supabase = createClient();

    /**
     * Log audit event
     */
    async log(event: AuditEvent) {
        try {
            const { error } = await this.supabase
                .from('audit_logs')
                .insert({
                    organization_id: event.organizationId,
                    user_id: event.userId,
                    user_email: event.userEmail,
                    user_ip: event.userIp,
                    event_type: event.eventType,
                    resource_type: event.resourceType,
                    resource_id: event.resourceId,
                    status: event.status,
                    metadata: event.metadata || {},
                    request_id: event.requestId,
                    user_agent: event.userAgent,
                });

            if (error) throw error;
        } catch (error) {
            console.error('Audit log error:', error);
            // Don't throw - logging should not break app
        }
    }

    /**
     * Get audit logs for organization
     */
    async getOrganizationLogs(
        organizationId: string,
        filters?: {
            eventType?: string;
            userId?: string;
            startDate?: string;
            endDate?: string;
        },
        page: number = 1,
        limit: number = 50
    ) {
        try {
            let query = this.supabase
                .from('audit_logs')
                .select('*', { count: 'exact' })
                .eq('organization_id', organizationId);

            if (filters?.eventType) {
                query = query.eq('event_type', filters.eventType);
            }

            if (filters?.userId) {
                query = query.eq('user_id', filters.userId);
            }

            if (filters?.startDate) {
                query = query.gte('created_at', filters.startDate);
            }

            if (filters?.endDate) {
                query = query.lte('created_at', filters.endDate);
            }

            const { data, error, count } = await query
                .order('created_at', { ascending: false })
                .range((page - 1) * limit, page * limit - 1);

            if (error) throw error;

            return {
                logs: data,
                pagination: {
                    total: count || 0,
                    page,
                    limit,
                    pages: Math.ceil((count || 0) / limit),
                },
            };
        } catch (error) {
            console.error('Get audit logs error:', error);
            throw error;
        }
    }
}

export const auditService = new AuditService();
