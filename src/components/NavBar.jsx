import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import {moviesContext} from '../context/MoviesContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo2 from "../images/logo3.jpg"

export default function NavBar() {

    const [categoria,setCategoria]=useState(false)
    const[menu, setMenu]=useState(false)
    const despliegaMenu =()=>{
        setMenu(!menu)
        setCategoria(false)
    }
    const mostrarCategoria=()=>{
        setCategoria(!categoria)
    }

    const {usuario,logout,setCategorias,filtrarNombre,filtrarCategoria,setInput}=useContext(moviesContext)
    
    const salir =()=>{
        logout()
      }
      const scroll=()=>{
        window.scroll({
          top: -1000,
          left: 100,
          
        }
        )}
    
  return (
    

        
        <div className='navBar'>
            <Link to={"/"} onClick={scroll} className="logo"><img src={logo2} alt="logo" width="120"  /></Link>
            <div className='menu' >
                <div className='busqueda'>
                    <input type="text" placeholder='Buscar Películas' onChange={e=>{setInput(e.currentTarget.value)}}/>
                    <a href="#titulo"><button className='search' onClick={filtrarNombre}>buscar</button></a>
                </div>
                
                <ul className='' >
                    <li onClick={mostrarCategoria} className="categoria">Categorias</li>
                    {categoria?
                    <ul className='categorias'>

                        <a href='#titulo'><li onMouseOver={()=>{setCategorias(" ")}} onClick={filtrarCategoria}>Todas</li></a>
                        <a href='#titulo'><li onMouseOver={()=>{setCategorias("Drama")}} onClick={filtrarCategoria}>Drama</li></a>
                        <a href='#titulo'><li onMouseOver={()=>{setCategorias("Comedia")}} onClick={filtrarCategoria}>Comedia</li></a>
                        <a href='#titulo'><li onMouseOver={()=>{setCategorias("Documental")}} onClick={filtrarCategoria}>Documental</li></a>
                        <a href='#titulo'><li onMouseOver={()=>{setCategorias("Acción")}} onClick={filtrarCategoria}>Acción</li></a>
                        
                    </ul>:<></>}
                    
                    
                    {usuario.usuario.nombre?
                        <div className='userNav'>
                            <li className="navlog">{usuario.usuario.nombre}</li>
                            <li onClick={salir} className="navlog">Logout</li>
                        </div> : 
                        <div className='userNav'>
                            <Link to={'/Login'} className="navlog">Login</Link>
                            <Link to={'/register'} className="navlog">Registrate</Link> 
                        </div> }

                </ul>
            </div>
            <button onClick={despliegaMenu} className="logoMenu"><FontAwesomeIcon icon={faBars}/></button>
            {menu?<div className='menu2 menuDesplegable' >
                <div className='busqueda'>
                    <input type="text" placeholder='Buscar2 Películas' onChange={e=>{setInput(e.currentTarget.value)}}/>
                    <a href="#titulo"><button className='search' onClick={filtrarNombre}>buscar</button></a>
                </div>
                
                <ul className='' >
                 
                    {usuario.usuario.nombre?
                        <div className='userNav'>
                            <li className="navlog">{usuario.usuario.nombre}</li>
                            <li onClick={salir} className="navlog">Logout</li>
                        </div> : 
                        <div className='userNav'>
                            <Link to={'/Login'} className="navlog">Login</Link>
                            <Link to={'/register'} className="navlog">Registrate</Link> 
                        </div> }
                        <li onClick={mostrarCategoria} className="categoria">Categorias</li>
                        {categoria?
                        <ul className='categorias2'>

                            <a href='#titulo'><li onMouseOver={()=>{setCategorias(" ")}} onClick={filtrarCategoria}>Todas</li></a>
                            <a href='#titulo'><li onMouseOver={()=>{setCategorias("Drama")}} onClick={filtrarCategoria}>Drama</li></a>
                            <a href='#titulo'><li onMouseOver={()=>{setCategorias("Comedia")}} onClick={filtrarCategoria}>Comedia</li></a>
                            <a href='#titulo'><li onMouseOver={()=>{setCategorias("Documental")}} onClick={filtrarCategoria}>Documental</li></a>
                            <a href='#titulo'><li onMouseOver={()=>{setCategorias("Acción")}} onClick={filtrarCategoria}>Acción</li></a>
                            
                        </ul>:<></>}
                </ul>
            </div>:<></>}
        </div>
        
        
    
  )
}
