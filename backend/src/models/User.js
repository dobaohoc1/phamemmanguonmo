const sequelize = require('../../configs/database');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true
  },
  workpostion: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true
  },
  phoneNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    trim: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
    trim: true
  },
  workStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'employee'
  },
  startDate: {
    type: DataTypes.DATE,
  },
  avatar: {
    type: DataTypes.TEXT,
  },
  salary: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
});

module.exports = User;
