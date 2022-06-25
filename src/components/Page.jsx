import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../config/firebase'
import { login, logout } from '../features/auth'
import NavBar from './NavBar'

export default function Page({children}) {
  const dispatch = useDispatch()
    const [usuarios,setUsuarios]=useState([])
    useEffect(()=>{

        

        onAuthStateChanged(auth,(authResult)=>{
            if(authResult){
                dispatch(login({
                    id:authResult.uid,
                    email:authResult.email,
                    name:authResult.displayName,
                    profilePic:authResult.photoURL
                }))
                // dispatch(getPosts(authResult.uid))
                // setTimeout(()=>{
                //     dispatch(getUsers())
                // },900) 
                // setTimeout(()=>{
                //     dispatch(getAllPosts())
                // },900) 

                

                
                
                // dispatch(getSolicitud(authResult.uid))
                // dispatch(getFriends(authResult.uid))
                
                
            }else{
                dispatch(logout())
            }
        })
        
    },[])
  return (
    <>  
        <>
            <NavBar/>
            {children}
            {/* {Mas componentes} */}
        </>
    </>
  )
}
