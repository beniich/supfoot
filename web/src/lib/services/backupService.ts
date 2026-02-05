

class BackupService {
    /**
     * Create manual backup
     * Note: This must be called from a server action or API route
     */
    async createBackup(organizationId: string, description?: string) {
        try {
            const projectId = process.env.SUPABASE_PROJECT_ID;
            const managementKey = process.env.SUPABASE_MANAGEMENT_API_KEY;

            if (!projectId || !managementKey) {
                throw new Error('Missing Supabase project ID or management key');
            }

            const response = await fetch(
                `https://api.supabase.com/v1/projects/${projectId}/database/backups`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${managementKey}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        description: description || `Manual backup - ${new Date().toISOString()}`,
                    }),
                }
            );

            const data = await response.json();

            // Log backup creation (optional, if you want to track it in your audit logs)
            // await auditService.log(...)

            return { success: true, backup: data };
        } catch (error) {
            console.error('Create backup error:', error);
            throw error;
        }
    }

    /**
     * List all backups
     */
    async listBackups() {
        try {
            const projectId = process.env.SUPABASE_PROJECT_ID;
            const managementKey = process.env.SUPABASE_MANAGEMENT_API_KEY;

            if (!projectId || !managementKey) {
                throw new Error('Missing Supabase project ID or management key');
            }

            const response = await fetch(
                `https://api.supabase.com/v1/projects/${projectId}/database/backups`,
                {
                    headers: {
                        'Authorization': `Bearer ${managementKey}`,
                    },
                }
            );

            const data = await response.json();

            return data;
        } catch (error) {
            console.error('List backups error:', error);
            throw error;
        }
    }
}

export const backupService = new BackupService();
