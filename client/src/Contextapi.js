import React,{useState,createContext} from "react"


export const logincontext = createContext()

export const Login =(props)=>{
     const [login,setlogin] = useState(false)
     const [currentuser,setcurrentuser] = useState()
     const [fav,setfav] = useState([])
     const [cart,setcart] = useState([])
     return(
         <logincontext.Provider value={
             {login:[login,setlogin],
              currentuser:[currentuser,setcurrentuser],
              cart:[cart,setcart],
            fav:[fav,setfav]
            }}>
            {props.children}
         </logincontext.Provider>
     )
}
