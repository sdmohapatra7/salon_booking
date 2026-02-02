const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
let customerToken = '';
let adminToken = '';
let serviceId = '';
let bookingId = '';

const runTests = async () => {
    try {
        console.log('--- STARTING VERIFICATION ---');

        // 1. Register Customer
        console.log('1. Registering Customer...');
        try {
            const regRes = await axios.post(`${API_URL}/auth/register`, {
                fullName: 'Test Customer',
                email: `customer_${Date.now()}@test.com`,
                password: 'password123'
            });
            customerToken = regRes.data.token;
            console.log('✅ Customer Registered:', regRes.data.email);
        } catch (e) {
            console.error('❌ Registration Failed:', e.response?.data || e.message);
        }

        // 2. Login Admin (Seeded)
        console.log('\n2. Logging in Admin...');
        try {
            const loginRes = await axios.post(`${API_URL}/auth/login`, {
                email: 'admin@salon.com',
                password: 'password123'
            });
            adminToken = loginRes.data.token;
            console.log('✅ Admin Logged In. Role:', loginRes.data.role);
        } catch (e) {
            console.error('❌ Admin Login Failed:', e.response?.data || e.message);
        }

        // 3. Admin: Create Service
        console.log('\n3. Admin: Creating Service...');
        try {
            const srvRes = await axios.post(`${API_URL}/services`, {
                name: 'Verification Cut',
                description: 'Test service',
                price: 50,
                duration: 30
            }, { headers: { Authorization: `Bearer ${adminToken}` } });
            serviceId = srvRes.data.id;
            console.log('✅ Service Created:', srvRes.data.name, '(ID:', serviceId, ')');
        } catch (e) {
            console.error('❌ Create Service Failed:', e.response?.data || e.message);
        }

        // 4. Customer: Book Service
        console.log('\n4. Customer: Booking Service...');
        try {
            const bookRes = await axios.post(`${API_URL}/bookings`, {
                serviceId: serviceId,
                date: '2026-12-25',
                time: '10:00',
                notes: 'Test Note',
                customerName: 'Test Customer'
            }, { headers: { Authorization: `Bearer ${customerToken}` } });
            bookingId = bookRes.data.booking.id;
            console.log('✅ Booking Created:', bookingId);
        } catch (e) {
            console.error('❌ Booking Failed:', e.response?.data || e.message);
        }

        // 5. Admin: Verify Booking Exists
        console.log('\n5. Admin: Fetching All Bookings...');
        try {
            const allBookings = await axios.get(`${API_URL}/bookings/all`, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            const found = allBookings.data.find(b => b.id === bookingId);
            if (found) console.log('✅ Booking Found in Admin List');
            else console.error('❌ Booking NOT Found in Admin List');
        } catch (e) {
            console.error('❌ Fetch All Bookings Failed:', e.response?.data || e.message);
        }

        // 6. Admin: Confirm Booking
        console.log('\n6. Admin: Confirming Booking...');
        try {
            await axios.put(`${API_URL}/bookings/${bookingId}/status`, {
                status: 'Confirmed'
            }, { headers: { Authorization: `Bearer ${adminToken}` } });
            console.log('✅ Booking Status Updated to Confirmed');
        } catch (e) {
            console.error('❌ Update Status Failed:', e.response?.data || e.message);
        }

        console.log('\n--- VERIFICATION COMPLETE ---');
        process.exit(0);

    } catch (err) {
        console.error('Unexpected Error:', err);
        process.exit(1);
    }
};

runTests();
