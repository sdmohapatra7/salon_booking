const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Staff = sequelize.define('Staff', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    specialty: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: 'https://ui-avatars.com/api/?name=Staff&background=random'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Staff;
