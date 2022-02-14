import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import {moviesContext} from '../context/MoviesContext'

import logo2 from "../images/logo3.jpg"
export default function NavBar() {

    const [categoria,setCategoria]=useState(false)
    
    const mostrarCategoria=()=>{
        setCategoria(!categoria)
    }

    const {usuario,logout,movies,show,setShow,filtroPeticion,actualizarFiltroPeticion,input,setInput}=useContext(moviesContext)
    


    const filtrarNombre=()=>{
        if(input===" "){         
            setShow(true)
            const filtroPeticion =[]
            actualizarFiltroPeticion(filtroPeticion)
            // console.log(filtroPeticion)
        }else{
            setShow(false)
            const filtroPeticion= movies.filter((movie)=>{
                return movie.title.toUpperCase().includes(input.toUpperCase())
            })
            actualizarFiltroPeticion(filtroPeticion)
            console.log(filtroPeticion)

        }
    }
    const[categorias,setCategorias]=useState()
    const filtrarCategoria=()=>{
        if(categorias===" "){         
            setShow(true)
            const filtroPeticion =[]
            actualizarFiltroPeticion(filtroPeticion)
            console.log(filtroPeticion)
        }else{
            setShow(false)
            const filtroPeticion= movies.filter((movie)=>{
                
                return movie.gender.toUpperCase().includes(categorias.toUpperCase())
            })
            actualizarFiltroPeticion(filtroPeticion)
            console.log(filtroPeticion)

        }
    }
    const salir =()=>{
        logout()
      }
    
    console.log(categorias)
  return (
    <nav className='navBar'>
        <Link to={"/"} className="logo"><img src={logo2} alt="logo" width="120"  /></Link>
        <div className='busqueda'>
            <input type="text" placeholder='Buscar Películas' onChange={e=>{setInput(e.currentTarget.value)}}/>
            <button className='search' onClick={filtrarNombre}>buscar</button>
        </div>
        
        <ul>
            <li onClick={mostrarCategoria} className="categoria">Categorias</li>
            {categoria?
            <ul className='categorias'>

                <li onMouseOver={()=>{setCategorias(" ")}} onClick={filtrarCategoria}>Todas</li>
                <li onMouseOver={()=>{setCategorias("Drama")}} onClick={filtrarCategoria}>Drama</li>
                <li onMouseOver={()=>{setCategorias("Comedia")}} onClick={filtrarCategoria}>Comedia</li>
                <li onMouseOver={()=>{setCategorias("Documental")}} onClick={filtrarCategoria}>Documental</li>
                <li onMouseOver={()=>{setCategorias("Acción")}} onClick={filtrarCategoria}>Acción</li>
                
            </ul>:<></>}
            {/* {!user.nombre?<li> <button onClick={()=>{setUser({nombre:"Usuario"})}}> Login</button></li>:<li>{user.nombre}</li>} */}
            
            {usuario.usuario.nombre?
                <div className='userNav'>
                    <li className="navlog">{usuario.usuario.nombre}</li>
                    <button onClick={salir} className="navlog">logout</button>
                </div> : 
                <div className='userNav'>
                    <Link to={'/Login'} className="navlog">Login</Link>
                    <Link to={'/register'} className="navlog">Registrate</Link> 
                </div> }

        </ul>
        
        
    </nav>
  )
}
