import { useState,createContext,useEffect } from "react";

// creating auth context for providing user and token throughout the app
export const AuthContext = createContext({})

//creating auth provider component
export const AuthProvider = ({children}) =>{
    // storing curr user info
    const [user,setUser] = useState(null)
    //storing jwt token
    const [token, setToken] = useState(localStorage.getItem('token')|| null)
    //storing user role
    const [role, setRole] = useState(null)

    // syncing token with local storge
    useEffect(() =>{
        if(token){
            localStorage.setItem('token',token) //saving token
        }
        else{
            localStorage.removeItem('token') // removing token
        }
    },[token])

    // providing auth state functions to children
    return(
        <AuthContext.Provider value={{user,setUser,token,setToken,role,setRole}}>
                {children}
        </AuthContext.Provider>
    )
}