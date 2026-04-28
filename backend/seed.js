const { sequelize, Service, User, Booking } = require('./models');

const seedData = async () => {
    try {
        await sequelize.sync({ force: true }); // Reset DB

        const services = await Service.bulkCreate([
            { name: "Executive Haircut", price: 65, duration: 45, category: "Hair Cut", image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&h=400&fit=crop" },
            { name: "Master Hair Coloring", price: 150, duration: 120, category: "Hair Color", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=400&fit=crop" },
            { name: "Spa Manicure", price: 45, duration: 60, category: "Manicure", image: "https://images.unsplash.com/photo-1604654894610-df490682160c?w=600&h=400&fit=crop" },
            { name: "Deluxe Pedicure", price: 55, duration: 75, category: "Pedicure", image: "https://images.unsplash.com/photo-1519415510236-8557bada8b09?w=600&h=400&fit=crop" },
            { name: "Hydra Facial", price: 110, duration: 90, category: "Facial", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop" },
            { name: "Signature Beard Styling", price: 35, duration: 30, category: "Beard", image: "https://images.unsplash.com/photo-1621605815841-2dd60bb10bd2?w=600&h=400&fit=crop" },
            { name: "Bridal Makeup", price: 250, duration: 180, category: "Makeup", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=400&fit=crop" },
            { name: "Deep Tissue Massage", price: 90, duration: 60, category: "Massage", image: "https://images.unsplash.com/photo-1544161515-4af6b1d46ac7?w=600&h=400&fit=crop" }
        ]);

        // Create Users
        const user1 = await User.create({
            name: "John Doe",
            email: "john@example.com",
            password: "password123",
            loyaltyPoints: 1250, // Has points to test redemption
            avatar: "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff"
        });

        const user2 = await User.create({
            name: "Jane Smith",
            email: "jane@example.com",
            password: "password123",
            loyaltyPoints: 0,
            avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=rose&color=fff"
        });

        // Admin User
        await User.create({
            name: "Super Admin",
            email: "admin@salon.com",
            password: "password123",
            role: "admin",
            avatar: "https://ui-avatars.com/api/?name=Admin&background=dark&color=fff"
        });

        // Create Bookings
        await Booking.bulkCreate([
            { date: "2024-05-15", time: "10:00", status: "Confirmed", serviceId: services[0].id, userId: user1.id, customerName: user1.name },
            { date: "2024-05-10", time: "02:00", status: "Completed", serviceId: services[2].id, userId: user1.id, customerName: user1.name },
            { date: "2024-05-20", time: "11:00", status: "Cancelled", serviceId: services[1].id, userId: user2.id, customerName: user2.name }
        ]);

        // Add Reviews
        const { Review } = require('./models');
        await Review.bulkCreate([
            { rating: 5, comment: "Best haircut ever!", userId: user1.id, serviceId: services[0].id },
            { rating: 4, comment: "Very relaxing massage.", userId: user1.id, serviceId: services[7].id },
            { rating: 5, comment: "Amazing bridal makeup, thank you!", userId: user2.id, serviceId: services[6].id }
        ]);

        console.log('Database seeded with enriched dummy data');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
