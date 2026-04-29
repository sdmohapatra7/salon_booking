const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Plan = sequelize.define('Plan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stripePriceId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    billingCycle: {
        type: DataTypes.ENUM('monthly', 'yearly'),
        defaultValue: 'monthly'
    },
    features: {
        type: DataTypes.JSON, // Array of strings
        defaultValue: []
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Plan;
