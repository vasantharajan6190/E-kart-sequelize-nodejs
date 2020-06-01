const Sequelize = require("sequelize")
const db = require("../config/database")

const User = db.define("user",{
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


module.exports = User