const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/Users")
const tokengenerator = require("../utils/tokengenerator")
const Item = require("../models/Items")
const Fav = require("../models/Fav")
const Cart = require("../models/Cart")
const jwt = require("jsonwebtoken")
const tokencheck = require("../middleware/tokencheck")
//Register Route
router.post("/register",async (req,res)=>{
    const {email,name,password,mobile} = req.body
     try{
        const ans = await User.findAll({where:{email}})
    if(ans.length>0){
        return res.json("false")
    }
    else{
        if(mobile.length!==10){
            return res.json("error")
        }
        else{
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt)
       const user = await User.create({email,name,password:hashedpassword,mobile_no:mobile})
       const token = tokengenerator(user.user_id)
       res.json({user,token})
        }
    }
}
catch(error){
   return res.send("Server Error "+error)
}
})
//Login Route
router.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const ans = await User.findAll({where:{email}})
        if(ans.length>0){
           const dbpassword = ans[0].password
           const passwordverify = await bcrypt.compare(password,dbpassword)
           if(passwordverify){
            const token = tokengenerator(ans[0].user_id)
            return res.json({ans,token})
           }
           else{
               return res.json("incorrect")
           }
        }
        else{
             return res.json("false")
        }
    } catch (error) {
        return res.send(error)
    }
})

//items section
//view all items
router.get("/items",async (req,res)=>{
    const items = await Item.findAll({attributes:['items_id','title','img','rating','price','favback','cartback']})
    res.json(items)
})
//create items
router.post("/items",tokencheck,async(req,res)=>{
    const {title,img,price,rating,currentname} = req.body
    try {
        const check = await Item.findAll({where:{title}})
        if(check.length>0){
            return res.json("false")
        }
        else{
            const user = await User.findAll({attributes:["user_id"],where:{email:currentname}})
            const userid = user[0].user_id
            const add = await Item.create({user_id:userid,title,img,price,rating})
            res.json(add)
        }
    } catch (error) {
        return res.json("server Error")
    }
})

//favourites section
//fav by user
router.get("/fav",tokencheck,async(req,res)=>{
    const currentname = req.query.search
    try {
        const user = await User.findAll({attributes:["user_id"],where:{email:currentname}})
        const userid = user[0].user_id
        Item.hasMany(Fav,{foreignKey:"items_id"})
        Fav.belongsTo(Item,{foreignKey:"items_id"})
        const check=await Fav.findAll({where:{user_id:userid},include:[Item]})
        const answer = check.map(res=>{return res.item})
        res.json(answer)
    } catch (error) { 
        return res.send(`Server Error ${error}`)
    }
})
//add to fav
router.post("/fav",tokencheck,async(req,res)=>{
    const {title,currentname} = req.body
    try {
        const user = await User.findAll({attributes:["user_id"],where:{email:currentname}})
            const userid = user[0].user_id
            const itemid = await Item.findAll({attributes:["items_id"],where:{title}})
            const add = await Fav.create({user_id:userid,items_id:itemid[0].dataValues.items_id})
            res.json(add)
        
    } catch (error) {
        return res.send(`Server Error ${error}`)
    }
})
//delete from fav
router.delete("/fav",tokencheck,async(req,res)=>{
    const favid = req.query.favid
    const userid = req.query.userid
    const itemid = await Item.findAll({attributes:["items_id"],where:{title:favid}})
    const add = itemid[0].dataValues.items_id
    const response = await Fav.destroy({where:{items_id:add,user_id:userid}})
    res.json("Data Deleted")
})


//cart section
//cart by user
router.get("/cart",tokencheck,async(req,res)=>{
    const currentname = req.query.search
    try {
        const user = await User.findAll({attributes:["user_id"],where:{email:currentname}})
        const userid = user[0].user_id
        Item.hasMany(Cart,{foreignKey:"items_id"})
        Cart.belongsTo(Item,{foreignKey:"items_id"})
        const check=await Cart.findAll({where:{user_id:userid},include:[Item]})
        const answer = check.map(res=>{return res.item})
        res.json(answer)
    } catch (error) {
        return res.send("Server Error")
    }
})
//add to cart
router.post("/cart",tokencheck,async(req,res)=>{
    const {title,img,rating,price,currentname} = req.body
    try {
    
        const user = await User.findAll({attributes:["user_id"],where:{email:currentname}})
        const userid = user[0].user_id
        const itemid = await Item.findAll({attributes:["items_id"],where:{title}})
        const add = await Cart.create({user_id:userid,items_id:itemid[0].dataValues.items_id})
        res.json(add)
        
    } catch (error) {
        return res.send("Server Error")
    }
})
//delete from cart
router.delete("/cart",tokencheck,async(req,res)=>{
    const favid = req.query.favid
    const userid = req.query.userid
    const itemid = await Item.findAll({attributes:["items_id"],where:{title:favid}})
    const add = itemid[0].dataValues.items_id
    const response = await Cart.destroy({where:{items_id:add,user_id:userid}})
    res.json("Data Deleted")
})

module.exports = router