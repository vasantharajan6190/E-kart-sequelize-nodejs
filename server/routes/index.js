const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/Users")
const Item = require("../models/Items")
const Fav = require("../models/Fav")
const Cart = require("../models/Cart")
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
       const newuser = await User.create({email,name,password:hashedpassword,mobile_no:mobile})
       res.json(newuser)
        }
    }
}
catch(error){
   return res.send("Server Error")
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
               return res.json(ans)
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
    const items = await Item.findAll({attributes:['title','img','rating','price','favback','cartback']})
    res.json(items)
})
//create items
router.post("/items",async(req,res)=>{
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
router.get("/fav",async(req,res)=>{
    const currentname = req.query.search
    try {
        const user = await User.findAll({attributes:["user_id"],where:{email:currentname}})
        const userid = user[0].user_id
        const check=await Fav.findAll({attributes:["title","img","rating","price","favback","cartback"],where:{user_id:userid}})
        res.json(check)
    } catch (error) {
        return res.send(`Server Error ${error}`)
    }
})
//add to fav
router.post("/fav",async(req,res)=>{
    const {title,img,rating,price,currentname} = req.body
    try {
        const user = await User.findAll({attributes:["user_id"],where:{email:currentname}})
            const userid = user[0].user_id
            const add = await Fav.create({user_id:userid,title,img,price,rating})
            res.json(add)
        
    } catch (error) {
        return res.send("Server Error")
    }
})
//delete from fav
router.delete("/fav",async(req,res)=>{
    const favid = req.query.favid
    const userid = req.query.userid
    const response = await Fav.destroy({where:{title:favid,user_id:userid}})
    res.json("Data Deleted")
})


//cart section
//cart by user
router.get("/cart",async(req,res)=>{
    const currentname = req.query.search
    try {
        const user = await User.findAll({attributes:["user_id"],where:{email:currentname}})
        const userid = user[0].user_id
        const check=await Cart.findAll({attributes:["title","img","rating","price","favback","cartback"],where:{user_id:userid}})
        res.json(check)
    } catch (error) {
        return res.send("Server Error")
    }
})
//add to cart
router.post("/cart",async(req,res)=>{
    const {title,img,rating,price,currentname} = req.body
    try {
    
        const user = await User.findAll({attributes:["user_id"],where:{email:currentname}})
            const userid = user[0].user_id
            const add = await Cart.create({user_id:userid,title,img,price,rating})
            res.json(add.rows)
        
    } catch (error) {
        return res.send("Server Error")
    }
})
//delete from cart
router.delete("/cart",async(req,res)=>{
    const favid = req.query.favid
    const userid = req.query.userid
    const response = await Cart.destroy({where:{title:favid,user_id:userid}})    
    res.json("Data Deleted")
})

module.exports = router