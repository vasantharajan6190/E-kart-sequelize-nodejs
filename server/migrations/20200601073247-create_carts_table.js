'use strict';

const { query } = require("../config/database");

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable("carts",{
    cart_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull:false
},
user_id:{
type:Sequelize.INTEGER,
allowNull:false,
references: {
  model: 'users', // 'persons' refers to table name
  key: 'user_id', // 'id' refers to column name in persons table
}
},

items_id:{
  type:Sequelize.INTEGER,
  allowNull:false,
  references: {
    model: 'items', // 'persons' refers to table name
    key: 'items_id', // 'id' refers to column name in persons table
  }
  }

   })
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.dropTable("carts")
  }
};
