import React,{Fragment,useContext,useEffect} from "react"
import "./fav.css"
import axios from "axios"
import {logincontext} from "../../Contextapi"
import Card from "../../components/card/card"
function Fav(props){
    const main= useContext(logincontext)
    const [login,setlogin] = main.login
    const [fav,setfav] = main.fav
    return(
        <Fragment>
        {login?
            <div>
            <div>
            <h4 className="container display-4">Your Favourites</h4>
            </div>
            <div className="container">
            {fav.map((res,index)=>(
                <Card pathname={props.location.pathname} favback={res.favback} cartback={res.cartback} key={index} title={res.title} price={res.price} rating={res.rating} src={res.img}/>
            ))}
            </div>
          </div>
    :
    <p className="text-center font-weight-normal display-3 mt-5">Login in to access the cart</p>}
        </Fragment>       
    )
}

export default Fav