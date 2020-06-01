import React,{useContext,useEffect, useState} from "react"
import {toast} from "react-toastify"
import {logincontext} from "../../Contextapi"
import {useHistory} from "react-router-dom"
import {createcontext} from "../../containers/homepage/homepage" 
import "./card.css"
import axios from "../../../../server/node_modules/axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus,faHeart,faBan } from '@fortawesome/free-solid-svg-icons'

function Card(props){
  const history = useHistory()
  const routename = props.pathname
  const main = useContext(logincontext)
  const [item,setitem] = useContext(createcontext)
  const [login,setlogin] = main.login
  const [fav,setfav] = main.fav
  const [currentuser,setcurrentuser] = main.currentuser
  
//cart
//get cart for current user
const addcartreact = async()=>{
  const favourites = await axios.get(`http://localhost:5000/cart?search=${currentuser.email}`)
  setcart(favourites.data)
}
//add cart todb with userid
const addcartdetail = async()=>{
  const {title,img,price,rating,favback,cartback} = addcart
  const currentname = currentuser.email 
  const body={title,img,price,rating,favback,cartback,currentname}
  const response = await fetch("http://localhost:5000/cart",{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify(body)
  })

}
//delete cart for the user
const deletecart=async(e)=>{
  let favid = addcart.title
  const response = await axios.delete(`http://localhost:5000/cart?userid=${currentuser.user_id}&favid=${favid}`)
}

   //Favourites
  //get fav for current user
  const addfav = async()=>{
    const favourites = await axios.get(`http://localhost:5000/fav?search=${currentuser.email}`)
    setfav(favourites.data)
    addcartreact()
}
//add fav to db with userid
const addfavourite = async()=>{
  const {title,img,price,rating,favback,cartback} = addcart
  const currentname = currentuser.email 
  const body={title,img,price,rating,favback,cartback,currentname}
  const response = await fetch("http://localhost:5000/fav",{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify(body)
  })

}
// delete fav for the user
const deletefav=async(e)=>{
  let favid = addcart.title
  const response = await axios.delete(`http://localhost:5000/fav?userid=${currentuser.user_id}&favid=${favid}`)
}
//call the addfav to store favitems to global varaible fav
 useEffect(()=>{
   addfav()
  },[])
 
  let favbutton = true
  let cartbutton = true
  const [cart,setcart] =main.cart
  
  const [addcart,setaddcart] = useState({
    title:props.title,
    price:props.price,
    rating:props.rating,
    img:props.src,
    favback:props.favback,
    cartback:props.cartback
  })
  //clicking on cart button
  function cartonclick(e){
    let itemindex = 0
    let enter = false
    cart.map((res,index)=>{
      if(res.title===addcart.title){
         itemindex = index
         enter=true
      }
    })
     
    if(!enter){
      item.map(res=>{
        if(res.title===addcart.title){
          res.cartback=true
          addcart.cartback = true
        }
      })
      cart.map(res=>{
        if(res.title===addcart.title){
          res.cartback=true
          addcart.cartback = true
        }
      })
      fav.map(res=>{
        if(res.title===addcart.title){
          res.cartback=true
          addcart.cartback = true
        }
      })
      addcartdetail()
      setcart(prev=>[...prev,addcart]) 
      console.log(addcart)
          toast.success("Item Added to cart",{className:"text-center mt-4"})
    }
    else{
      item.map(res=>{
        if(res.title===addcart.title){
          res.cartback=false
          addcart.cartback=false
        }
      }) 
      cart.map(res=>{
        if(res.title===addcart.title){
          res.cartback=false
          addcart.cartback=false
        }
      })
      fav.map(res=>{
        if(res.title===addcart.title){
          res.cartback=false
          addcart.cartback=false
        }
      })
      deletecart(e)
      setcart(prev=>[...prev,addcart])
      const toupdate = cart
      toupdate.splice(itemindex,1)
      setcart(toupdate)
      toast.success("Item removed from cart",{className:"text-center mt-4"})
     
    }
    history.push(routename)
   console.log(itemindex)
  }
  
//clicking on favourite button 

  function favonclick(e){
    let enter = false
    let itemindex = 0 
    fav.map((res,index)=>{
      if(res.title===addcart.title){
         itemindex = index
         enter = true
      }
    })
     
    if(!enter){
      const change = !(addcart.favback)
      setaddcart({...addcart,favback:change})
      item.map(res=>{
        if(res.title===addcart.title){
          res.favback=
          addcart.favback=true
        }
      })
      cart.map(res=>{
        if(res.title===addcart.title){
          res.favback=true
          addcart.favback=true
        }
      })
      fav.map(res=>{
        if(res.title===addcart.title){
          res.favback=true
          addcart.favback=true
        }
      })
      setfav(prev=>[...prev,addcart])
        addfavourite()
          toast.success("Item Added to Favourites",{className:"text-center mt-4"})
          history.push(routename)
    }
    else{
      const change = !(addcart.favback)
      setaddcart({...addcart,favback:change})
      item.map(res=>{
        if(res.title===addcart.title){
          res.favback=false
          addcart.favback=false
        }
      })
      cart.map(res=>{
        if(res.title===addcart.title){
          res.favback=false
          addcart.favback=false
        }
      })
      fav.map(res=>{
        if(res.title===addcart.title){
          res.favback=false
          addcart.favback=false
        }
      })
      deletefav(e)
      setfav(prev=>[...prev,addcart])
      const toupdate = fav
      toupdate.splice(itemindex,1)
     
      setfav(toupdate)
      toast.success("Item removed from favourites",{className:"text-center mt-4"})
      history.push(routename)
    }
  }



//delete on clicking the x button
  function delonclick(e){
    if(routename==="/cart"){
         let delindex=0
         cart.map((res,index)=>{
           if(res.title===addcart.title){
                delindex = index
           }
         })
         deletecart()
         const toupdate = cart
          toupdate.splice(delindex,1)
          setcart(toupdate)
          toast.success("Item deleted from cart",{className:"text-center mt-4"})
          history.push("/cart")
    }
    else{
      if(routename==="/fav"){
        let delindex=0
        fav.map((res,index)=>{
          if(res.title===addcart.title){
               delindex = index
          }
        })
        deletefav()
        const toupdate = fav
         toupdate.splice(delindex,1)
         setfav(toupdate)
         toast.success("Item deleted from favourites",{className:"text-center mt-4"})
         history.push("/fav")
      }
    }
  }
return(
    <div className="card col-md-3 float-left m-5" style={{width: "18rem"}}>
  <img className="card-img-top" src={props.src}/>
  <div className="card-body">
    <h5 className="card-title text-center">{props.title}</h5>
    <div className="d-flex justify-content-around">
    <p className="card-text">Rs.{props.price}-/-</p>
    <a className="text-right">Ratings: {props.rating}</a>
    </div>
  </div>
  {login?
  <div className="d-flex mb-2 justify-content-between">
  {routename==="/cart"?null:<FontAwesomeIcon icon={faCartPlus} onClick={e=>cartonclick(e)} className={props.cartback?"text-warning":"cart"} />}
  {routename==="/fav"?null:<FontAwesomeIcon icon={faHeart} onClick={(e)=>favonclick(e)} className={props.favback?"text-warning":"cart"} />}
  {routename==="/showitems"?null:<FontAwesomeIcon icon={faBan} onClick={e=>delonclick(e)} className="cart"/>}
  </div>:null}
 
 
  <button className="btn btn-sm btn-primary mb-2">More...</button>
</div>
)
}

export default Card