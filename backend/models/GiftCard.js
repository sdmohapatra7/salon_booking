const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GiftCard = sequelize.define('GiftCard', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    initialValue: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'used', 'expired'),
        defaultValue: 'active'
    },
    recipientEmail: {
        type: DataTypes.STRING,
        allowNull: true
    },
    expiryDate: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

module.exports = GiftCard;
