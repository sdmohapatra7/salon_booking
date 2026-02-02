const axios = require('axios');
const API_URL = 'http://localhost:5000/api';

// Colors for console output
const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    cyan: "\x1b[36m"
};

async function verifyFeatures() {
    console.log(colors.cyan + "\n🚀 Starting Full Feature Verification...\n" + colors.reset);

    let token = '';
    let userId = null;
    let serviceId = null;
    let bookingId = null;

    try {
        // 1. Register User
        console.log("1. Registering Test User...");
        const randomEmail = `testuser${Date.now()}@example.com`;
        const authRes = await axios.post(`${API_URL}/auth/register`, {
            name: "Test User",
            email: randomEmail,
            password: "password123"
        });
        token = authRes.data.token;
        userId = authRes.data.id; // Response is flat now
        console.log(colors.green + "   ✅ Registered: " + randomEmail + colors.reset);

        // 2. Get Services
        console.log("\n2. Fetching Services...");
        const servicesRes = await axios.get(`${API_URL}/services`);
        if (servicesRes.data.length > 0) {
            serviceId = servicesRes.data[0].id;
            console.log(colors.green + `   ✅ Found Service: ${servicesRes.data[0].name} (ID: ${serviceId})` + colors.reset);
        } else {
            console.log(colors.red + "   ❌ No services found. Seeding needed." + colors.reset);
            return;
        }

        // 3. Create Booking (Simulating functionality of Payment Form success)
        console.log("\n3. Creating Booking (Simulating Payment Success)...");
        const bookingRes = await axios.post(`${API_URL}/bookings`, {
            serviceId: serviceId,
            date: "2026-12-25",
            time: "10:00",
            notes: "Test Booking",
            customerName: "Test User",
            userId: userId
        });
        bookingId = bookingRes.data.booking.id;
        console.log(colors.green + `   ✅ Booking Created! ID: ${bookingId}` + colors.reset);
        console.log(colors.yellow + "   👀 CHECK SERVER CONSOLE FOR 'Booking Confirmation' EMAIL LOG" + colors.reset);

        // 4. Create Review (Should succeed for booked service)
        console.log("\n4. Submitting Review for Booked Service...");
        const reviewRes = await axios.post(`${API_URL}/reviews`, {
            serviceId: serviceId,
            rating: 5,
            comment: "Amazing service! Highly verified."
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(colors.green + "   ✅ Review Submitted Successfully!" + colors.reset);

        // 5. Verify Review Appears
        console.log("\n5. Verifying Review Visibility...");
        const reviewsRes = await axios.get(`${API_URL}/reviews/service/${serviceId}`);
        const myReview = reviewsRes.data.find(r => r.comment === "Amazing service! Highly verified.");
        if (myReview) {
            console.log(colors.green + "   ✅ Review found in public list." + colors.reset);
        } else {
            console.log(colors.red + "   ❌ Review NOT found." + colors.reset);
        }

        // 6. Cancel Booking
        console.log("\n6. Cancelling Booking...");
        await axios.post(`${API_URL}/bookings/${bookingId}/cancel`);
        console.log(colors.green + "   ✅ Booking Cancelled." + colors.reset);
        console.log(colors.yellow + "   👀 CHECK SERVER CONSOLE FOR 'Booking Cancellation' EMAIL LOG" + colors.reset);

        console.log(colors.cyan + "\n✨ All Features Verified Successfully!" + colors.reset);

    } catch (err) {
        console.log(colors.red + "\n❌ Verification Failed:" + colors.reset);
        if (err.response) {
            console.log("   Status:", err.response.status);
            console.log("   Data:", err.response.data);
        } else {
            console.log("   Error:", err.message);
        }
    }
}

verifyFeatures();
