import { addDoc, collection, deleteDoc, doc, setDoc,updateDoc } from 'firebase/firestore'

import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Movie from '../components/Movie'
import Movies from '../components/Movies'
import { database } from '../config/firebase'
import {getMovies} from '../features/movies/index'
import Page from '../components/Page'
export default function CreateMovie() {
  const [open,setOpen]=useState(false)
  const [movie,setMovie]= useState({})
    const dispatch= useDispatch()
    const {peliculas}= useSelector(state=>state.peliculas)
    
    const create =(e)=>{
      e.preventDefault()
      const {año,description,gender,img,imgfondo,stars,title,trailer,duracion}=e.target
      const newMovie = {
        año:año.value,
        description:description.value,
        gender:gender.value,
        img:img.value,
        imgfondo:imgfondo.value,
        
        title:title.value,
        trailer:trailer.value,
        duracion:duracion.value,
        comentarios:[],
        stars:[]
        
      }
      console.log(newMovie)
      addDoc(collection(database,"peliculas"),newMovie)
      dispatch(getMovies())
      e.target.reset()
    }
    const deletePeli=(idMovie)=>{
      console.log(idMovie)
      deleteDoc(doc(database, "peliculas",idMovie))
      dispatch(getMovies())
    }
    const tomarMovie =(id)=>{
      setOpen(true)
      peliculas.map((peli)=>{
        if(peli.id===id){
          setMovie(peli)
        }
      })
    }
    
    const editarPeli=(e)=>{
      e.preventDefault()
      const {año,description,gender,img,imgfondo,stars,title,trailer,duracion,idMovie}=e.target
      const editedMovie = {
        año:año.value,
        description:description.value,
        gender:gender.value,
        img:img.value,
        imgfondo:imgfondo.value,
        stars:[],
        title:title.value,
        trailer:trailer.value,
        duracion:duracion.value,
        
      }
      console.log(editedMovie)
      console.log(idMovie.value)
      updateDoc(doc(database,"peliculas",idMovie.value),editedMovie)
      dispatch(getMovies())
      
      e.target.reset()
      setOpen(false)
    }
    useEffect(()=>{
      dispatch(getMovies())
    },[])
  return (
    <Page>
        {open&&<div className='fixed bg-black w-full h-full bg-opacity-80 z-30 '>
            
            
            {movie&&
            <div className='bg-violet-500 relative w-1/2  m-auto rounded-md mt-24'>
              <button className='absolute top-0 right-0 bg-red-500 h-5 w-5 p-3 rounded-md  flex justify-center items-center' onClick={()=>{setOpen((false)); setMovie({})}}>X</button>
              <h2 className='text-5xl text-center py-8  '>Editar pelicula</h2>
              <form onSubmit={editarPeli} className="flex flex-col gap-4  h-  p-10 mx-auto " >
                <input type="text" name='title' className='w-1/2 m-auto rounded-md p-2 text-black' placeholder='Titulo' defaultValue={movie.title}/>
                <input type="text" name='año' className='w-1/2 m-auto rounded-md p-2 text-black' placeholder='Año' defaultValue={movie.año}/>
                <input type="hidden" name='idMovie' className='w-1/2 m-auto rounded-md p-2 text-black'  defaultValue={movie.id}/>
                <input type="text" name='description' className='w-1/2 m-auto rounded-md p-2 text-black' placeholder='Descripción' defaultValue={movie.description}/>
                <input type="text" name='gender' className='w-1/2 m-auto rounded-md p-2 text-black' placeholder='Genero' defaultValue={movie.gender}/>
                <input type="text" name='img' className='w-1/2 m-auto rounded-md p-2 text-black' placeholder='Imagen' defaultValue={movie.img}/>
                <input type="text" name='imgfondo' className='w-1/2 m-auto rounded-md p-2 text-black' placeholder='Banner' defaultValue={movie.imgfondo}/>
                <input type="text" name='stars' className='w-1/2 m-auto rounded-md p-2 text-black' placeholder='estrellas' defaultValue={movie.stars}/>
                <input type="text" name='trailer' className='w-1/2 m-auto rounded-md p-2 text-black' placeholder='Trailer' defaultValue={movie.trailer}/>
                <input type="text" name='duracion' className='w-1/2 m-auto rounded-md p-2 text-black' placeholder='Duración' defaultValue={movie.duracion}/>
                <button type='submit' className='bg-violet-300 w-1/2 m-auto p-3 rounded-md text-white' >Editar {movie.title}</button>
              </form>
            </div>}
          </div>}
        <article className='flex'>
          
          
          <div className='grid grid-cols-3 w-1/2'>
          {peliculas.map((peli)=><div className='relative'>
            <div className='absolute flex justify-between top-5 right-12   gap-2 my-2'>
              <button className=' z-10 bg-violet-400 h-5 p-2 flex justify-center items-center' onClick={()=>{tomarMovie(peli.id)}}>Editar</button>
              <button className=' z-10 bg-red-500 h-5 w-5 p-2 rounded-full flex justify-center items-center' onClick={()=>{deletePeli(peli.id)}}>x</button>
              
            </div>
            
            <Movie movie={peli}/>
          </div>)}
          </div>
          <div className='w-1/2 flex flex-col  '>
            <h1 className='text-3xl text-center my-10'>Crear pelicula</h1>
            <form onSubmit={create} className="flex flex-col gap-4  h- bg-violet-500 p-10 mx-auto w-2/4" >
              <input type="text" name='title' className='w-1/2 m-auto rounded-md p-2 text-black' placeholder='Titulo'/>
              <input type="text" name='año' className='w-1/2 m-auto rounded-md p-2 text-black' placeholder='Año'/>
              <input type="text" name='description' className='w-1/2 m-auto rounded-md p-2 text-black' placeholder='Descripción'/>
              <input type="text" name='gender' className='w-1/2 m-auto rounded-md p-2 text-black' placeholder='Genero'/>
              <input type="text" name='img' className='w-1/2 m-auto rounded-md p-2 text-black' placeholder='Imagen'/>
              <input type="text" name='imgfondo' className='w-1/2 m-auto rounded-md p-2 text-black' placeholder='Banner'/>
              {/* <input type="text" name='stars' className='w-1/2 m-auto rounded-md p-2 text-black' placeholder='estrellas'/> */}
              <input type="text" name='trailer' className='w-1/2 m-auto rounded-md p-2 text-black' placeholder='Trailer'/>
              <input type="text" name='duracion' className='w-1/2 m-auto rounded-md p-2 text-black' placeholder='Duración'/>
              <button className='bg-violet-300 w-1/2 m-auto p-3 rounded-md text-black'>Crear Pelicula</button>
            </form>
          </div>
        
        
        
        </article>
        

    </Page>
  )
}
