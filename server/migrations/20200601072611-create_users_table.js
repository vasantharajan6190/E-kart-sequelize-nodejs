'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users",{
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
  },
  name:{
     type:Sequelize.STRING(200),
     allowNull:false
  },
  email:{
    type:Sequelize.STRING(200),
    allowNull:false,
    unique:true
 },
 password:{
    type:Sequelize.STRING(200),
    allowNull:false
 },
 mobile_no:{
    type:Sequelize.STRING(200),
    allowNull:false
 }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users")
  }
};
