const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Property = sequelize.define('Property', {
  prop_id: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  preference: DataTypes.CHAR(1),
  description: DataTypes.TEXT,
  property_type: DataTypes.STRING(100),
  city: DataTypes.STRING(50),
  transact_type: DataTypes.INTEGER,
  owntype: DataTypes.INTEGER,
  bedroom_num: DataTypes.INTEGER,
  balcony_num: DataTypes.INTEGER,
  price_per_unit_area: DataTypes.INTEGER,
  furnish: DataTypes.INTEGER,
  facing: DataTypes.INTEGER,
  age: DataTypes.INTEGER,
  floor_num: DataTypes.INTEGER,
  total_floor: DataTypes.INTEGER,
  features: DataTypes.TEXT,
  prop_name: DataTypes.STRING(255),
  price_sqft: DataTypes.INTEGER,
  map_details: DataTypes.JSONB,
  amenities: DataTypes.TEXT,
  area: DataTypes.STRING(50),
  price: DataTypes.DECIMAL(15, 2),
  prop_heading: DataTypes.STRING(255),
  secondary_tags: DataTypes.ARRAY(DataTypes.TEXT),
  total_landmark_count: DataTypes.INTEGER,
  formatted_landmark_details: DataTypes.JSONB,
  society_name: DataTypes.STRING(255),
  building_name: DataTypes.STRING(255),
  location: DataTypes.JSONB,
  availability_status: DataTypes.STRING(20),
  owner_id: DataTypes.INTEGER,
  owner_name: DataTypes.STRING(100),
  rent_price: DataTypes.INTEGER
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Property; 