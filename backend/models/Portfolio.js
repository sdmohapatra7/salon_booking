const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Portfolio = sequelize.define('Portfolio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM('Hair', 'Nails', 'Facial', 'Makeup', 'Massage'),
        defaultValue: 'Hair'
    }
});

module.exports = Portfolio;
