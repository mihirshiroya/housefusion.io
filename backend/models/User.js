const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  clerkUserId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  role: {
    type: DataTypes.ENUM('buyer', 'seller', 'admin'),
    allowNull: false,
    defaultValue: 'buyer'
  },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

User.associate = function(models) {
  User.hasMany(models.Property, { foreignKey: 'sellerId' });
  User.hasMany(models.Inquiry, { foreignKey: 'buyerId' });
  User.hasMany(models.Appointment, { foreignKey: 'buyerId' });
  User.hasMany(models.Transaction, { foreignKey: 'buyerId' });
  User.hasMany(models.Transaction, { foreignKey: 'sellerId' });
  User.belongsToMany(models.Property, { 
    through: 'SavedProperties',
    as: 'savedProperties',
    foreignKey: 'userId'
  });
};

module.exports = User;
