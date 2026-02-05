-- ============================================================
-- SOC2 COMPLIANCE & ENTERPRISE FEATURES SCHEMA
-- ============================================================

-- 1. RBAC (Role-Based Access Control)
-- ============================================================

-- Create custom roles
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM (
        'viewer',           -- Read-only access
        'editor',           -- Can create/edit content
        'moderator',        -- Can moderate comments/users
        'admin',            -- Full access to app
        'super_admin'       -- System-level access
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add role to profiles table (assuming profiles exists, if not create it)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    updated_at TIMESTAMPTZ
);

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'viewer';

-- Add team/organization support
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    
    -- Settings
    settings JSONB DEFAULT '{
        "ip_whitelist": [],
        "allowed_domains": []
    }'::jsonb,
    
    -- SOC2 Compliance
    soc2_enabled BOOLEAN DEFAULT false,
    hipaa_enabled BOOLEAN DEFAULT false,
    
    -- Billing
    plan TEXT DEFAULT 'free', -- 'free', 'pro', 'team', 'enterprise'
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organization members
CREATE TABLE IF NOT EXISTS public.organization_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    role user_role NOT NULL,
    
    -- Permissions override
    permissions JSONB DEFAULT '{
        "can_read": true,
        "can_write": false,
        "can_delete": false,
        "can_manage_users": false,
        "can_manage_billing": false
    }'::jsonb,
    
    invited_by UUID REFERENCES public.profiles(id),
    invited_at TIMESTAMPTZ DEFAULT NOW(),
    joined_at TIMESTAMPTZ,
    
    UNIQUE(organization_id, user_id)
);

-- RLS Policies
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own memberships" ON public.organization_members;
CREATE POLICY "Users can view own memberships"
    ON public.organization_members FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can manage members" ON public.organization_members;
CREATE POLICY "Admins can manage members"
    ON public.organization_members FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.organization_members om
            WHERE om.organization_id = organization_members.organization_id
            AND om.user_id = auth.uid()
            AND om.role IN ('admin', 'super_admin')
        )
    );

-- 2. AUDIT LOGS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Organization
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    
    -- User who performed action
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    user_email TEXT,
    user_ip TEXT,
    
    -- Action details
    event_type TEXT NOT NULL, -- 'user_login', 'data_access', 'data_export', etc.
    resource_type TEXT, -- 'user', 'news', 'match', etc.
    resource_id TEXT,
    
    -- Action outcome
    status TEXT NOT NULL, -- 'success', 'failure'
    
    -- Additional context
    metadata JSONB DEFAULT '{}'::jsonb,
    
    -- Request details
    request_id TEXT,
    user_agent TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast querying
CREATE INDEX IF NOT EXISTS idx_audit_logs_org ON public.audit_logs(organization_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON public.audit_logs(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_event ON public.audit_logs(event_type, created_at DESC);

-- Auto-delete old logs (28 days retention) function
CREATE OR REPLACE FUNCTION delete_old_audit_logs()
RETURNS void AS $$
BEGIN
    DELETE FROM public.audit_logs
    WHERE created_at < NOW() - INTERVAL '28 days';
END;
$$ LANGUAGE plpgsql;

-- Configure cron job for log deletion (requires pg_cron extension)
-- SELECT cron.schedule('delete-old-logs', '0 3 * * *', 'SELECT delete_old_audit_logs()');
