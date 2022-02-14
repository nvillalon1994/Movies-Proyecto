import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom';
import Page from '../components/Page'
import { moviesContext } from '../context/MoviesContext';

export default function Register() {
    const {register,user,logout} = useContext(moviesContext)
    const name =useRef()
    const correo =useRef()
    const password =useRef()
    const registrar =()=>{
        let nombre =name.current.value
        // let email =correo.current.value
        let contraseña =password.current.value
        register(nombre,contraseña)
    }
    const salir =()=>{
      logout()
    }
    console.log(user.user)
  return (
    <Page>
        <div className='contenedor-form'>
          <form className="formulario">
              <h1 id='titulo'>Registrate</h1>

              <input className='input'   type="text" ref={name} placeholder='Ingrese el nombre de Usuario'/>
              <input className='input' type="password" ref={password} name="" id="" placeholder='Ingrese su contraseña' />
              {/* <input className='input'  type="email" ref={correo} placeholder='Ingrese su Email' /> */}
              
          </form>
          <Link to={'/Login'} className='regis' onClick={registrar}>Registrate</Link>
          {/* <button onClick={salir}>Salir</button> */}
        </div>
        <p>Ya tienes cuenta? <Link to={'/login'} className="registrate">Logueate!</Link> </p>
    </Page>
  )
}
