import React,{ useState,useContext,useEffect} from "react"
import "./showitems.css"
import axios from "axios"
import Card from "../../components/card/card"
import {logincontext} from "../../Contextapi"
import {createcontext} from "../../containers/homepage/homepage"
function Showitems(props){
const [item,setitem ] = useContext(createcontext)
const main= useContext(logincontext)
const [currentuser,setcurrentuser] = main.currentuser
const [login,setlogin] = main.login
const [fav,setfav] = main.fav
const routename = props.location.pathname



return(
    <React.Fragment>
    
    <p className="text-center mt-5 font-weight-normal display-3" style={{ color:"#015298"}}>Our Products</p>
    <h5 className="text-center">Total No.of.Products: {item.length}</h5>
<div className="ml-3 row m-0 justify-content-start">
{item.map((res,index)=>(
    <Card pathname={routename} favback={res.favback} cartback={res.cartback} key={index} fav={res.fav} cart={res.cart} title={res.title} rating={res.rating} src={res.img} price={res.price}/>
))}
</div>
</React.Fragment>
)
}

export default Showitems