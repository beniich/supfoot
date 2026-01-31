const API_URL = 'http://localhost:5000/api';

async function testAuth() {
    const email = `test.${Date.now()}@example.com`;
    // Password must match strict regex: Upper, Lower, Number, Special
    const password = 'Password@123';
    let token = '';

    console.log(`🚀 Starting Auth Test with ${email}`);

    // 1. REGISTER
    console.log('\nTesting REGISTER...');
    try {
        const regRes = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
                firstName: 'Test',
                lastName: 'User'
            })
        });
        const regData = await regRes.json();

        if (regRes.status === 201 && regData.success) {
            console.log('✅ Register SUCCESS');
            token = regData.token;
        } else {
            console.error('❌ Register FAILED:', JSON.stringify(regData, null, 2));
            return;
        }
    } catch (e) {
        console.error('❌ Register CHECK FAILED (Server down?):', e.message);
        return;
    }

    // 2. LOGIN
    console.log('\nTesting LOGIN...');
    const loginRes = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const loginData = await loginRes.json();

    if (loginRes.status === 200 && loginData.success) {
        console.log('✅ Login SUCCESS');
        token = loginData.token;
    } else {
        console.error('❌ Login FAILED:', loginData);
    }

    // 3. PROTECTED ROUTE (ME)
    console.log('\nTesting PROTECTED ROUTE (/auth/me)...');
    const meRes = await fetch(`${API_URL}/auth/me`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const meData = await meRes.json();

    if (meRes.status === 200 && meData.success) {
        console.log(`✅ Protected Route SUCCESS. Hello ${meData.user.firstName}`);
    } else {
        console.error('❌ Protected Route FAILED:', meData);
    }

    // 4. RATE LIMIT CHECK (Optional, usually 5 attempts allowed)
    // Not running here to avoid locking myself out
}

testAuth().catch(console.error);
