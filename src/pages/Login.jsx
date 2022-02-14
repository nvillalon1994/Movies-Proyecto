import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Page from '../components/Page'
import { moviesContext } from '../context/MoviesContext';
export default function Login() {
  const {user,login,logout}=useContext(moviesContext)
  const name =useRef()
  const password =useRef()
  
  const userRegister =user.user

  
  
  const ingreso = ()=>{
      
      let nombre1 = name.current.value
      let contraseña1 =password.current.value
      const userName = userRegister.find(element=> element.nombre ===nombre1)
      console.log(userName===undefined || userName.contraseña!==contraseña1)
      
      if(userName===undefined || userName.contraseña!==contraseña1){
        alert("Usuario o contraseña no valido")
      }else{
        
        if(userName.nombre===nombre1 && userName.contraseña===contraseña1){
          login(nombre1,contraseña1)
        
      }}
      
      
  }
  const salir =()=>{
    logout()
  }
  
  
  return (
    <Page>
      <div className='contenedor-form'>
        <form action="" className='formulario'  >
            <h1 id='titulo'>Ingresa</h1>

            <input className='input'   type="text" ref={name} placeholder='Ingrese el nombre de Usuario'/>
            <input className='input' type="password" ref={password} name="" id="" placeholder='Ingrese su contraseña' />
            
        </form>
        
        <Link to={'/'} className="regis" onClick={ingreso} >Ingresa</Link>
        
        
      </div>
      <p>No tienes cuenta? <Link to={'/register'} className="registrate">Registrate!</Link> </p>
    </Page>
  )
}
