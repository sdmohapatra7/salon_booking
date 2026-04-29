const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed'),
        defaultValue: 'Confirmed'
    },
    paymentStatus: {
        type: DataTypes.ENUM('Pending', 'Paid', 'Failed', 'Refunded'),
        defaultValue: 'Pending'
    },
    stripeSessionId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    staffId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

module.exports = Booking;
