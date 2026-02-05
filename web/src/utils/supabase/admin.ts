import { createClient } from '@supabase/supabase-js'

// Note: This client should ONLY be used in server-side contexts (API routes, server components, server actions).
// NEVER import this in a client component.

export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
)
