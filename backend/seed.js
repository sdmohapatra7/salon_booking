const { sequelize, Service, User, Booking } = require('./models');

const seedData = async () => {
    try {
        await sequelize.sync({ force: true }); // Reset DB

        const services = await Service.bulkCreate([
            { name: "Haircut", price: 50, duration: 30, category: "Hair Cut", image: "https://placehold.co/600x400?text=Haircut" },
            { name: "Hair Coloring", price: 120, duration: 90, category: "Hair Color", image: "https://placehold.co/600x400?text=Coloring" },
            { name: "Manicure", price: 30, duration: 45, category: "Manicure", image: "https://placehold.co/600x400?text=Manicure" },
            { name: "Pedicure", price: 40, duration: 60, category: "Pedicure", image: "https://placehold.co/600x400?text=Pedicure" },
            { name: "Facial", price: 80, duration: 60, category: "Facial", image: "https://placehold.co/600x400?text=Facial" },
            { name: "Beard Trim", price: 25, duration: 20, category: "Beard", image: "https://placehold.co/600x400?text=Beard+Trim" }
        ]);

        // Create Dummy User
        const user = await User.create({
            name: "John Doe",
            email: "john@example.com",
            password: "password123", // Plain text for demo
            avatar: "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff"
        });

        // Create Dummy Bookings
        await Booking.bulkCreate([
            {
                date: "2024-02-15",
                time: "10:00 AM",
                status: "Confirmed",
                notes: "First time visit",
                serviceId: services[0].id, // Haircut
                userId: user.id,
                customerName: user.name
            },
            {
                date: "2024-02-20",
                time: "02:00 PM",
                status: "Completed",
                serviceId: services[2].id, // Manicure
                userId: user.id,
                customerName: user.name
            }
        ]);

        console.log('Database seeded with Services, User, and Bookings');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
