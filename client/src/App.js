import React,{Fragment,useContext}from "react";
import "./app.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus,faHeart,faBan } from '@fortawesome/free-solid-svg-icons'
import {BrowserRouter,Switch,Route,Link,useHistory} from 'react-router-dom'
import Showitems from "./containers/showitems/showitems"
import Admin from "./containers/Admin/admin"
import { toast } from "react-toastify";
import {createcontext} from "./containers/homepage/homepage"
import {logincontext} from "./Contextapi"
import 'react-toastify/dist/ReactToastify.css';
import Homepage from './containers/homepage/homepage';
import {Variables} from "./containers/homepage/homepage"
import Register from "./containers/register/register"
import Login from "./containers/login/login"
import Cart from "./containers/cart/cart"
import Fav from "./containers/favourites/fav"
toast.configure({autoClose:2000});
function App() {
  const history = useHistory()
  const main = useContext(logincontext)
  const [login,setlogin] = main.login
  const [currentuser,setcurrentuser] = main.currentuser
  let bool =false
  if(login===true){
       bool=true
  }
  function onclick(){
    setlogin(!login)
    toast.success("Logged Out Successfully",{className:"text-center mt-4"})
  }
  return (
    <Variables>
       <Fragment>
       <BrowserRouter>
       <nav className="navbar navbar-expand navbar-light bg-light" style={{height:"55px"}}>
       <div className="container ml-3">
       <Link to="/shoppingpage"><h5 className="navbar-brand text-white font-weight-bold">E-Kart</h5></Link>
       <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
       <span className="navbar-toggler-icon"></span>
     </button>
     <div className="collapse navbar-collapse" id="navbarNav">
       <ul className="navbar-nav" style={{marginBottom: "8px"}}>
         <li className="nav-item">
           <Link to="/showitems" className="nav-link font-weight-bold text-warning">View Items</Link>
         </li>
         <li className="nav-item">
         {bool? <Link to="/admin" className="nav-link font-weight-bold text-warning">Add items</Link>:null}
       </li>
       </ul>
     </div>
     <div className="d-flex justify-content-end mt-2">
     {bool?<p className="text-warning mr-2 font-weight-bold">{currentuser.name.slice(0,8)}...</p>:
     <div className="float-right d-flex">
     <Link to="/login"><p className="text-warning font-weight-bold mr-4">Login</p></Link>
     <Link to="/register"><p className="text-warning font-weight-bold ">Sign Up</p></Link>
     </div>
    }
     </div>
       </div>
       {bool?<Link to="/shoppingpage" style={{marginTop:"-9px"}}><button className="float-right btn btn-sm btn-white px-3 my-2" onClick={onclick}>Log Out</button></Link>:null}
      </nav>
      {login?
      <div className="d-flex justify-content-end">
      <Link to="/cart"><button className="btn font-weight-bold btn-sm btn-outline-warning border rounded px-4 m-2">:<FontAwesomeIcon icon={faCartPlus} className="mr-2"/>My Cart</button></Link>
      <Link to="/fav"><button className="btn font-weight-bold btn-sm btn-outline-warning border rounded px-4 m-2"><FontAwesomeIcon icon={faHeart} className="mr-2"/>Favourites</button></Link>
      </div>:null}
       <Switch>
       <Route path="/showitems" exact component={Showitems}/>
       <Route path="/admin" exact component={Admin}/>
       <Route path="/login" exact component={Login}/>
       <Route path="/register" exact component={Register}/>
       <Route path="/shoppingpage" exact component={Homepage}/>
       <Route path="/fav" exact component={Fav}/>
       <Route path="/cart" exact component={Cart}/>
       </Switch>
       </BrowserRouter>
       </Fragment>
       </Variables>
  );
}

export default App;
