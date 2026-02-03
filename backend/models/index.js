const sequelize = require('../config/database');
const User = require('./User');
const Service = require('./Service');
const Booking = require('./Booking');
const Favorite = require('./Favorite');
const Review = require('./Review');

// Associations
User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

Service.hasMany(Booking, { foreignKey: 'serviceId' });
Booking.belongsTo(Service, { foreignKey: 'serviceId' });

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

Service.hasMany(Review, { foreignKey: 'serviceId' });
Review.belongsTo(Service, { foreignKey: 'serviceId' });

// Favorites Association
User.hasMany(Favorite, { foreignKey: 'userId' });
Favorite.belongsTo(User, { foreignKey: 'userId' });

Service.hasMany(Favorite, { foreignKey: 'serviceId' });
Favorite.belongsTo(Service, { foreignKey: 'serviceId' });

module.exports = {
    sequelize,
    User,
    Service,
    Booking,
    Review,
    Favorite
};
