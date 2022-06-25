import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {moviesContext} from '../context/MoviesContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo2 from "../images/logo3.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import {login,logout} from '../features/auth/index'
import { getFiltroBusqueda, getFiltrocategoria } from '../features/movies';

export default function NavBar() {
    const auth2 = useSelector(state=>state.auth)
    const {filtro} = useSelector(state=>state.peliculas)
    console.log(auth2)
    const [categoria,setCategoria]=useState(false)
    const [open,setOpen]=useState(false)
    const[menu, setMenu]=useState(false)
    const despliegaMenu =()=>{
        setMenu(!menu)
        setCategoria(false)
    }
    const mostrarCategoria=()=>{
        setCategoria(!categoria)
    }
    const navegate = useNavigate()
   

    const filtroCategoria=(categoria)=>{
        dispatch(getFiltrocategoria(categoria))
        setCategoria(false)
    }

    const filtrarNombre=(info)=>{
        console.log(info)
        if(info===""){
            setOpen(false)
        }else{
            setOpen(true)
            dispatch(getFiltroBusqueda(info))
        }
        setCategoria(false)
        
    }
    const dispatch=useDispatch()
    const salir =()=>{
        logout()
        signOut(auth)
        navegate("/Login")
      }
      const scroll=()=>{
        window.scroll({
          top: -1000,
          left: 100,
          
        }
        )}
    
  return (
    

        
        <div className='navBar relative z-40'>
            {open&&<div className='absolute text-center md:top-16  md:right-[50%] top-44 right-12 bg-violet-400 md:bg-opacity-70 max-w-[200px] w-fit p-2 px-2 max-h-[400px] overflow-auto '>
                {filtro.map((peli)=><div className=''>
                <Link to={"/details/"+peli.id} className='flex justify-between p-2 ' onClick={()=>{setOpen(false);setMenu(false)}}>
                    <img className='max-h-24' src={peli.img} alt="" />
                    <p className=''>{peli.title}</p>
                </Link>
                </div>)}
                </div>}
            <Link to={"/"} onClick={scroll} className="logo"><img src={logo2} alt="logo" width="120"  /></Link>
            <div className='menu ' >
                <div className='busqueda'>
                    <input type="text" className='h-10' placeholder='Buscar Películas' onChange={e=>{filtrarNombre(e.currentTarget.value)}}/>
                    {/* <a href="#titulo"><button className='search' onClick={filtrarNombre}>buscar</button></a> */}
                </div>
                
                <ul className='my-auto' >
                    
                    {categoria?
                    <ul className='categorias'>

                        <a href='#titulo'><li  onClick={()=>{filtroCategoria("todas")}}>Todas</li></a>
                        <a href='#titulo'><li  onClick={()=>{filtroCategoria("drama")}}>Drama</li></a>
                        <a href='#titulo'><li onClick={()=>{filtroCategoria("comedy")}}>Comedia</li></a>
                        <a href='#titulo'><li onClick={()=>{filtroCategoria("musical")}}>Musical</li></a>
                        <a href='#titulo'><li onClick={()=>{filtroCategoria("action")}}>Acción</li></a>
                        
                    </ul>:<></>}    
                    
                    
                    {auth2.logged?
                        <div className='userNav'>
                            {auth2.user.name==="Natalio"&&<Link to={'/CreateMovies'} className="navlog">Crear</Link>}
                            <li className="navlog ">{auth2.user.name}</li>
                            <li onClick={mostrarCategoria} className="categoria">Categorias</li>
                            <li onClick={salir} className="navlog">Logout</li>
                            
                        </div> : 
                        <div className='userNav'>
                            <Link to={'/Login'} className="navlog">Login</Link>
                            
                             
                        </div> }

                </ul>
            </div>
            <button onClick={despliegaMenu} className="logoMenu"><FontAwesomeIcon icon={faBars}/></button>
            {menu?<div className='menu2 menuDesplegable' >
                <div className='busqueda'>
                    <input type="text" placeholder='Buscar2 Películas' onChange={e=>{filtrarNombre(e.currentTarget.value)}}/>
                    
                </div>
                
                <ul className='' >
                 
                    {auth2.logged?
                        <div className='userNav'>
                            <li className="navlog">{auth2.user.name}</li>
                            <li onClick={salir} className="navlog">Logout</li>
                        </div> : 
                        <div className='userNav'>
                            <Link to={'/Login'} className="navlog">Login</Link>
                            <Link to={'/register'} className="navlog">Registrate</Link> 
                        </div> }
                        <li onClick={mostrarCategoria} className="categoria">Categorias</li>
                        {categoria?
                        <ul className='categorias2'>

                            <a href='#titulo'><li  onClick={()=>{filtroCategoria("todas")}}>Todas</li></a>
                            <a href='#titulo'><li  onClick={()=>{filtroCategoria("drama")}}>Drama</li></a>
                            <a href='#titulo'><li onClick={()=>{filtroCategoria("comedy")}}>Comedia</li></a>
                            <a href='#titulo'><li onClick={()=>{filtroCategoria("musical")}}>Musical</li></a>
                            <a href='#titulo'><li onClick={()=>{filtroCategoria("action")}}>Acción</li></a>
                            
                        </ul>:<></>}
                </ul>
            </div>:<></>}
        </div>
        
        
    
  )
}
