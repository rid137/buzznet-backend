'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Follow = sequelize.define('Follow', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  followerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  followingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  freezeTableName: true,
  modelName: 'Follow',
  indexes: [
    {
      unique: true,
      fields: ['followerId', 'followingId']
    },
  ],
});

Follow.belongsTo(User, { as: 'follower', foreignKey: 'followerId', onDelete: 'CASCADE' });
Follow.belongsTo(User, { as: 'following', foreignKey: 'followingId', onDelete: 'CASCADE' });

User.hasMany(Follow, { as: 'followingUsers', foreignKey: 'followerId' });
User.hasMany(Follow, { as: 'followers', foreignKey: 'followingId' });

module.exports = Follow;