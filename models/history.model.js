const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const History = sequelize.define(
  'History',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userMessage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    aiResponse: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    consent: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'histories',
    timestamps: true,
  }
);

module.exports = History;
