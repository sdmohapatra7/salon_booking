const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

// Routes
const servicesRoutes = require('./routes/services');
const bookingsRoutes = require('./routes/bookings');
const authRoutes = require('./routes/auth');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// API Routes
app.use('/api/services', servicesRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/auth', authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Database Connection & Server Start
sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        // Sync models (force: false means don't drop tables if they exist)
        // In dev, you might use { force: true } to reset DB, strictly for this demo I'll use default.
        return sequelize.sync();
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log('Error: ' + err);
    });
