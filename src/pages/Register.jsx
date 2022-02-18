import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom';
import Page from '../components/Page'
import { moviesContext } from '../context/MoviesContext';
import loginReducer from '../reducers/loginReducer';

export default function Register() {
    const {register,login} = useContext(moviesContext)
    const name =useRef()
    
    const password =useRef()
    const registrar =()=>{
        let nombre =name.current.value
        
        let contraseña =password.current.value
        register(nombre,contraseña)
        login(nombre,contraseña)
    }
    
    
  return (
    <Page>
        <div className='contenedor-form'>
          <form className="formulario">
              <h1 id='titulo'>Registrate</h1>

              <input className='input'   type="text" ref={name} placeholder='Ingrese el nombre de Usuario'/>
              <input className='input' type="password" ref={password} name="" id="" placeholder='Ingrese su contraseña' />
              
              
          </form>
          <Link to={'/'} className='regis' onClick={registrar}>Registrate</Link>
          
        </div>
        <p>Ya tienes cuenta? <Link to={'/login'} className="registrate">Logueate!</Link> </p>
    </Page>
  )
}
