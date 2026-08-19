const sequelize = require('../config/database');
const Admin = require('./admin.model');
const Product = require('./product.model');
const History = require('./history.model');

module.exports = {
  sequelize,
  Admin,
  Product,
  History,
};

