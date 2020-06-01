import React,{Fragment,useContext} from "react"
import "./cart.css"
import {logincontext} from "../../Contextapi"
import Card from "../../components/card/card"
function Cart(props){
    const main= useContext(logincontext)
    const [cart,setcart] = main.cart
    const [login,setlogin] = main.login
    let pricetot = 0
    return(
        <Fragment >
        {login?
            <div>
            <h1 className="font-weight-normal mt-2 text-center">Your Cart:</h1>
            <div className="container">
            <h5>Total.No.of.Products:{cart.length}</h5>
            </div>
            <div className="ml-3 row m-0 justify-content-start">
            {cart.map((res,index)=>(
                pricetot = parseInt(res.price)+pricetot,
                <Card pathname={props.location.pathname} favback={res.favback} cartback={res.cartback} key={index} title={res.title} price={res.price} rating={res.rating} src={res.img}/>
            ))}
            </div>
            <div className="mr-5">
            <h2 className="container my-4 font-weight-normal">Total Price:{pricetot}</h2>
            </div>
            </div>  :
        <p className="text-center font-weight-normal display-3 mt-5">Login in to access the cart</p>
        }   
             </Fragment>       
    )
}

export default Cart