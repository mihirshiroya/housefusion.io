const Inquiry = sequelize.define('Inquiry', {
  message: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM('new', 'responded', 'closed'),
    defaultValue: 'new'
  },
  response: DataTypes.TEXT
}); 