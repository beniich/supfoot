import { createClient } from '@/utils/supabase/client';

export type UserRole = 'viewer' | 'editor' | 'moderator' | 'admin' | 'super_admin';

export interface Permission {
    can_read: boolean;
    can_write: boolean;
    can_delete: boolean;
    can_manage_users: boolean;
    can_manage_billing: boolean;
}

class RBACService {
    private supabase = createClient();

    /**
     * Check if user has permission
     */
    async hasPermission(
        userId: string,
        organizationId: string,
        permission: keyof Permission
    ): Promise<boolean> {
        try {
            const { data, error } = await this.supabase
                .from('organization_members')
                .select('role, permissions')
                .eq('organization_id', organizationId)
                .eq('user_id', userId)
                .single();

            if (error || !data) return false;

            // Super admin has all permissions
            if (data.role === 'super_admin') return true;

            // Check specific permission
            return data.permissions[permission] === true;
        } catch (error) {
            console.error('Permission check error:', error);
            return false;
        }
    }

    /**
     * Get user role in organization
     */
    async getUserRole(userId: string, organizationId: string): Promise<UserRole | null> {
        try {
            const { data, error } = await this.supabase
                .from('organization_members')
                .select('role')
                .eq('organization_id', organizationId)
                .eq('user_id', userId)
                .single();

            if (error || !data) return null;

            return data.role;
        } catch (error) {
            console.error('Get role error:', error);
            return null;
        }
    }

    /**
     * Assign role to user
     */
    async assignRole(
        userId: string,
        organizationId: string,
        role: UserRole,
        permissions?: Partial<Permission>
    ) {
        try {
            const defaultPermissions: Permission = {
                can_read: true,
                can_write: role !== 'viewer',
                can_delete: ['admin', 'super_admin'].includes(role),
                can_manage_users: ['admin', 'super_admin'].includes(role),
                can_manage_billing: role === 'super_admin',
            };

            const { data, error } = await this.supabase
                .from('organization_members')
                .upsert({
                    organization_id: organizationId,
                    user_id: userId,
                    role,
                    permissions: { ...defaultPermissions, ...permissions },
                })
                .select()
                .single();

            if (error) throw error;

            return { success: true, data };
        } catch (error) {
            console.error('Assign role error:', error);
            throw error;
        }
    }

    /**
     * Remove user from organization
     */
    async removeUser(userId: string, organizationId: string) {
        try {
            const { error } = await this.supabase
                .from('organization_members')
                .delete()
                .eq('organization_id', organizationId)
                .eq('user_id', userId);

            if (error) throw error;

            return { success: true };
        } catch (error) {
            console.error('Remove user error:', error);
            throw error;
        }
    }

    /**
     * Get organization members
     */
    async getOrganizationMembers(organizationId: string) {
        try {
            const { data, error } = await this.supabase
                .from('organization_members')
                .select(`
          *,
          user:profiles(id, email, first_name, last_name, avatar_url)
        `)
                .eq('organization_id', organizationId)
                .order('role', { ascending: false });

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Get members error:', error);
            throw error;
        }
    }
}

export const rbacService = new RBACService();
