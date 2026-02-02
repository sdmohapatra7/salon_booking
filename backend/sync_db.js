const { sequelize } = require('./models');

const syncDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');

        console.log('Syncing database with alter: true...');
        await sequelize.sync({ alter: true });
        console.log('Database synced successfully.');
    } catch (err) {
        console.error('Error syncing database:', err);
    } finally {
        // Exit process
        setTimeout(() => process.exit(0), 1000);
    }
};

syncDb();
