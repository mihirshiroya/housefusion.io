const Transaction = sequelize.define('Transaction', {
  amount: DataTypes.DECIMAL,
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  transactionDate: DataTypes.DATE,
  details: DataTypes.TEXT
}); 