require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function testConnection() {
    console.log('🔌 Testing Supabase Connection via supabase-js...');
    console.log('Target URL:', process.env.SUPABASE_URL);

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        console.error('❌ Missing credentials in .env file');
        process.exit(1);
    }

    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    try {
        // Attempt to fetch from 'audit_logs' (table we defined in schema)
        // If it exists, success. If it doesn't, we'll get a specific error proving we connected.
        const { data, error } = await supabase
            .from('audit_logs')
            .select('count', { count: 'exact', head: true });

        if (error) {
            if (error.code === 'PGRST204' || error.code === '42P01') {
                console.log('✅ Connected to Supabase! (But "audit_logs" table not found - Pending Migration)');
                console.log('   Action: Please run the SQL migration script in your Supabase Dashboard.');
            } else {
                console.log('⚠️ Connected, but encountered error:', error.message);
            }
        } else {
            console.log('✅ Connection Successful! "audit_logs" table found.');
        }

    } catch (err) {
        console.error('❌ Connection Failed:', err.message);
    }
}

testConnection();
