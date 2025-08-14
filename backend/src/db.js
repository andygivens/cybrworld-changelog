const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'changelog',
  process.env.DB_USER || 'changelog',
  process.env.DB_PASSWORD || 'changelog',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = { sequelize };
