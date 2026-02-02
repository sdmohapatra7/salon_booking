const { User } = require('./models');
const sequelize = require('./config/database');

const seedAdmin = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');

        // Ensure email is unique, destroy if exists for clean seed or just findOne
        const email = 'admin@salon.com';
        const existing = await User.findOne({ where: { email } });

        if (existing) {
            console.log('Admin user already exists.');
            // Update to ensure it is admin
            existing.role = 'admin';
            await existing.save();
            console.log('Updated existing user to Admin role.');
            return;
        }

        await User.create({
            name: 'Super Admin',
            email: email,
            password: 'password123', // In real app, hash this!
            role: 'admin',
            avatar: 'https://ui-avatars.com/api/?name=Super+Admin&background=0D9488&color=fff'
        });

        console.log('Admin user created successfully.');
    } catch (err) {
        console.error('Error creating admin:', err);
    } finally {
        // We do NOT close the connection if we run via node separate, but sequelize pool handles it. 
        // Actually for a script we should exit.
        // process.exit(); 
        // But let's just let it finish.
    }
};

seedAdmin();
