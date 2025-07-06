'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Post = require('./post');

const Like = sequelize.define('Like', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  freezeTableName: true,
  modelName: 'Like',
  indexes: [
    {
      unique: true,
      fields: ['userId', 'postId']
    },
  ],
});

Like.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });
Like.belongsTo(Post, { foreignKey: 'postId', onDelete: 'CASCADE' });

User.hasMany(Like, { foreignKey: 'userId' });
Post.hasMany(Like, { foreignKey: 'postId' });

module.exports = Like;