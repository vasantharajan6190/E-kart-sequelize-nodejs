import React,{useState,Fragment,createContext,useEffect} from "react"
import {Link} from 'react-router-dom'
import "./homepage.css"

export const createcontext = createContext()
export const Variables = (props)=>{
    const [item,setitem] = useState(

        // {  
        //     title:"Mi note 8",
        //     img:"https://download.appmifile.com/5_updatepdf_in/28/02/2019/b7c1a94f-78d8-47ca-a3aa-d6c417b62d6e.png",
        //     price:"10000",
        //     rating:"4.4",
        //     favback:false,
        //     cartback:false
        // },
        // {  
        //     title:"iPhone 8",
        //     img:"https://www.gizmochina.com/wp-content/uploads/2019/09/Apple-iPhone-11-1-500x500.jpg",
        //     price:"52000",
        //     rating:"4.6",
        //     favback:false,
        //     cartback:false
        // },
        // {  
        //     title:"Realme 5",
        //     img:"https://images-na.ssl-images-amazon.com/images/I/71YC1181G3L._SX679_.jpg",
        //     price:"13000",
        //     rating:"3.4",
        //     favback:false,
        //     cartback:false
        // }
    );
    const getreq=async()=>{
        const data = await fetch("http://localhost:5000/items")
        const ans=await data.json()
        setitem(ans)
        
   }
useEffect(()=>{getreq()},[])
    return(
         <createcontext.Provider value={[item,setitem]}>
         {props.children}
         </createcontext.Provider>
    )
}

function Homepage(){
    return(
        <Fragment>
        <div className="body">
        <div className="justify-content-center body">
        <p className="text-center font-weight-normal head display-2 my-5">Welcome to E-Kart</p>
        <h4 className="text-center font-italic text-warning">We are for the Customers<br/>of the customers<br/>by the customers</h4>
        <div className="d-flex justify-content-around mt-5">
        </div>
        </div>
        </div>
        </Fragment>
    )
}

export default Homepage