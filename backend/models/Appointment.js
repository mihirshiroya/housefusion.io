const Appointment = sequelize.define('Appointment', {
  dateTime: DataTypes.DATE,
  duration: DataTypes.INTEGER,
  purpose: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM('scheduled', 'completed', 'cancelled'),
    defaultValue: 'scheduled'
  }
}); 