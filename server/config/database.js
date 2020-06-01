const { Sequelize } = require('sequelize');
module.exports= new Sequelize('ekart', 'postgres', 'password', {
    host: 'localhost',
    dialect:'postgres'
  });
  