const Sequelize = require("sequelize")
const db = require("../config/database")

const Cart = db.define("cart",{
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
    model: 'users',
    key: 'user_id', 
 }
  },
  items_id:{
    type:Sequelize.INTEGER,
    allowNull:false,
    references: {
      model: 'items',
      key: 'items_id', 
    }
    }
  
})

module.exports = Cart