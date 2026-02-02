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
        type: DataTypes.ENUM('Confirmed', 'Cancelled', 'Completed'),
        defaultValue: 'Confirmed'
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: true // For guest bookings, or populated from User
    }
});

module.exports = Booking;
