const sendBookingConfirmation = (user, booking) => {
    // In a real app, this would use nodemailer or an email API like SendGrid/AWS SES.
    // Here we simulate it by logging to the console.

    console.log('\n==================================================');
    console.log('📧  EMAIL SENT TO:', user?.email || booking.customerEmail || 'Guest');
    console.log('--------------------------------------------------');
    console.log('Subject: Booking Confirmation - Salon Booking App');
    console.log('--------------------------------------------------');
    console.log(`Hi ${booking.customerName},`);
    console.log('Your booking has been successfully confirmed!');
    console.log('');
    console.log(`Service: ${booking.serviceName}`);
    console.log(`Date: ${booking.date}`);
    console.log(`Time: ${booking.time}`);
    console.log('');
    console.log('Thank you for choosing us!');
    console.log('==================================================\n');
};

const sendBookingCancellation = (booking) => {
    console.log('\n==================================================');
    console.log('📧  EMAIL SENT TO:', booking.customerName); // Assuming we have email or using name
    console.log('Subject: Booking Cancellation');
    console.log(`Your booking for ${booking.serviceName} on ${booking.date} at ${booking.time} has been cancelled.`);
    console.log('==================================================\n');
};


module.exports = {
    sendBookingConfirmation,
    sendBookingCancellation
};
