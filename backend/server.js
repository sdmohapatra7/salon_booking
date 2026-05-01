const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { sequelize } = require('./models');
const errorHandler = require('./middleware/errorHandler');

// Routes
const servicesRoutes = require('./routes/services');
const bookingsRoutes = require('./routes/bookings');
const authRoutes = require('./routes/auth');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Optimization Middleware
app.use(helmet());
app.use(compression());
app.use(cors());

// Stripe Webhook needs raw body before express.json()
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));

app.use(express.json());
const passport = require('./config/passport');
app.use(passport.initialize());

// Request logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// API Routes
app.use('/api/services', servicesRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payments', require('./routes/payments'));
app.use('/api/staff', require('./routes/staff'));
app.use('/api/plans', require('./routes/plans'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/working-hours', require('./routes/workingHours'));
app.use('/api/gift-cards', require('./routes/giftCards'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/favorites', require('./routes/favorites'));
app.use('/api/2fa', require('./routes/twoFactor'));

// Global Error Handler (Centralized)
app.use(errorHandler);

// Database Connection & Server Start
sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log('Error: ' + err);
    });
