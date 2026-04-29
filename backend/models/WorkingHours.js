const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WorkingHours = sequelize.define('WorkingHours', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dayOfWeek: {
        type: DataTypes.INTEGER, // 0 (Sunday) to 6 (Saturday)
        allowNull: false,
        unique: true
    },
    dayName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    openTime: {
        type: DataTypes.STRING, // "HH:mm"
        defaultValue: '09:00'
    },
    closeTime: {
        type: DataTypes.STRING, // "HH:mm"
        defaultValue: '18:00'
    },
    isClosed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = WorkingHours;
