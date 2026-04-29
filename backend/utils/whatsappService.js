const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromWhatsApp = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';

let client;
if (accountSid && authToken) {
    client = twilio(accountSid, authToken);
}

const sendWhatsAppMessage = async (to, message) => {
    if (!client) {
        console.log('--- WhatsApp Simulation ---');
        console.log(`To: ${to}`);
        console.log(`Message: ${message}`);
        console.log('---------------------------');
        return { success: true, simulated: true };
    }

    try {
        // Ensure the number is in the correct format for WhatsApp
        const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
        
        const response = await client.messages.create({
            body: message,
            from: fromWhatsApp,
            to: formattedTo
        });

        console.log(`WhatsApp message sent: ${response.sid}`);
        return { success: true, sid: response.sid };
    } catch (error) {
        console.error('WhatsApp Error:', error);
        return { success: false, error: error.message };
    }
};

const sendBookingNotification = async (booking, serviceName) => {
    const message = `Hello ${booking.customerName}! 🌟\n\nYour appointment for *${serviceName}* is confirmed for *${booking.date}* at *${booking.time}*.\n\nWe look forward to seeing you!\n\n📍 Salon Booking System`;
    
    if (booking.phone) {
        return await sendWhatsAppMessage(booking.phone, message);
    }
};

const sendPaymentSuccessNotification = async (booking, serviceName) => {
    const message = `Payment Received! ✅\n\nHi ${booking.customerName}, we've received your payment of $${booking.totalAmount} for *${serviceName}*.\n\nSee you on ${booking.date} at ${booking.time}!\n\nBest, Salon Team`;
    
    if (booking.phone) {
        return await sendWhatsAppMessage(booking.phone, message);
    }
};

module.exports = {
    sendWhatsAppMessage,
    sendBookingNotification,
    sendPaymentSuccessNotification
};
