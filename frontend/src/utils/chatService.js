// src/utils/chatService.js

// Simple context retention (in memory, resets on reload)
let lastTopic = null;

const GREETINGS = [
  "Hello! How can I help you with your booking today?",
  "Hi there! Ready for a fresh look?",
  "Greetings! How can we make your day better?"
];

const FALLBACKS = [
  "I see. Tell me more, or feel free to browse our services!",
  "That sounds interesting. Have you checked our latest offers?",
  "I'm listening. How can I assist you further?"
];

/**
 * Simulates an AI chatbot with context and personalization.
 * 
 * @param {string} userMessage 
 * @param {object} user - User object from Redux (optional)
 * @returns {Promise<string>}
 */
export const sendMessageToBot = async (userMessage, user) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 500));

  const lowerMsg = userMessage.toLowerCase();

  // 1. Personalized Greeting
  if (lowerMsg.match(/\b(hello|hi|hey|greetings)\b/)) {
    lastTopic = 'greeting';
    if (user && user.name) {
      const firstName = user.name.split(' ')[0];
      const personalizedGreetings = [
        `Hi ${firstName}! 👋 Great to see you again. How can I help you today?`,
        `Hello ${firstName}! Hope you're having a wonderful day. Need any help with bookings?`,
        `Hey ${firstName}! Service or booking questions? I'm here to help!`,
        `Welcome back, ${firstName}! ✨ What can I do for you?`
      ];
      return personalizedGreetings[Math.floor(Math.random() * personalizedGreetings.length)];
    }
    return GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
  }

  // 2. Thank you handling
  if (lowerMsg.match(/\b(thanks|thank you)\b/)) {
    return "You're very welcome! Let me know if you need anything else.";
  }

  // 3. Price Context
  if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('cheap') || lowerMsg.includes('expensive')) {
    lastTopic = 'price';
    return "Our prices start from $25 for basic cuts. We have a detailed price list on our 'Services' page. Are you looking for a specific service like coloring or styling?";
  }

  // Follow-up to price
  if (lastTopic === 'price' && (lowerMsg.includes('color') || lowerMsg.includes('dye'))) {
    return "Our coloring services start at $80. Full details are in the Services tab!";
  }

  // 4. Booking Intent
  if (lowerMsg.includes('book') || lowerMsg.includes('appointment') || lowerMsg.includes('schedule')) {
    lastTopic = 'booking';
    return "I can help with that! You can book directly by clicking 'Book Now' on any service. Do you need help finding a stylist?";
  }

  // 5. Hours/Time
  if (lowerMsg.includes('time') || lowerMsg.includes('open') || lowerMsg.includes('hours') || lowerMsg.includes('weekend')) {
    return "We are open daily from 9:00 AM to 9:00 PM. We're also open on weekends!";
  }

  // 6. Navigation / Status
  if (lowerMsg.includes('status') || lowerMsg.includes('check')) {
    if (!user) return "Please log in to check your booking status.";
    return "You can view all your upcoming appointments in the 'My Bookings' dashboard.";
  }

  // 7. Location
  if (lowerMsg.includes('location') || lowerMsg.includes('address') || lowerMsg.includes('where')) {
    return "We're located at 123 Fashion Street, Trendy District. Look for the neon scissors! ✂️";
  }

  // 8. Contact
  if (lowerMsg.includes('contact') || lowerMsg.includes('phone') || lowerMsg.includes('email')) {
    return "You can reach us at hello@hairrapbyyoyo.com or call (555) 123-4567.";
  }

  // Default Fallback
  lastTopic = null;
  return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
};
