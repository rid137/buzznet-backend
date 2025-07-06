'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const DeviceToken = sequelize.define('DeviceToken', {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,

  },
  fcmToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  platform: {
    type: DataTypes.ENUM('android', 'ios', 'web'),
    defaultValue: 'web',
    allowNull: false
  },
}, {
  timestamps: true,
  freezeTableName: true,
  modelName: 'DeviceToken',
  indexes: [
    {
      unique: true,
      fields: ['userId']
    },
  ],
});

DeviceToken.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(DeviceToken, { foreignKey: 'userId', as: 'deviceToken' });

module.exports = DeviceToken;