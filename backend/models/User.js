const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true // Allow null for Google Auth users
    },
    googleId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    avatar: {
        type: DataTypes.STRING,
        defaultValue: 'https://ui-avatars.com/api/?name=User&background=random'
    },
    role: {
        type: DataTypes.ENUM('customer', 'admin'),
        defaultValue: 'customer'
    },
    twoFactorSecret: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isTwoFactorEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    loyaltyPoints: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    referralCode: {
        type: DataTypes.STRING,
        unique: true
    },
    referredBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    planId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    subscriptionStatus: {
        type: DataTypes.ENUM('inactive', 'active', 'past_due', 'cancelled'),
        defaultValue: 'inactive'
    },
    subscriptionEndDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    stripeCustomerId: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            if (!user.referralCode) {
                user.referralCode = 'SALON-' + Math.random().toString(36).substring(2, 8).toUpperCase();
            }
        }
    }
});

// Associations for self-referencing (Referrals)
User.belongsTo(User, { as: 'Referrer', foreignKey: 'referredBy' });
User.hasMany(User, { as: 'Referrals', foreignKey: 'referredBy' });

module.exports = User;
