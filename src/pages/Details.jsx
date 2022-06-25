import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams ,Navigate, useNavigate} from 'react-router-dom';
import Movie from '../components/Movie';
import { moviesContext } from '../context/MoviesContext';
import Page from '../components/Page'
import SoloPeli from '../components/soloMovie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Trailer from '../components/Trailer';
import { useDispatch, useSelector } from 'react-redux'
import { getMovies } from '../features/movies/index';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { database } from '../config/firebase';


export default function Details() {
  const [disable,setDisable]=useState(false)
  const {id} = useParams()
  const {movies,reviews,addReview,usuario,deleteReview,addRanking} = useContext(moviesContext)
  const comentario = useRef()
  const rating = useRef()
  // console.log(movies)
  //const navigate = useNavigate()
  const auth = useSelector(state=>state.auth)
 
  // const movie = movies.filter(movie=>movie.id===id)[0]
  
  
  const {peliculas}= useSelector(state=>state.peliculas)
  
  const movie = peliculas.find(pelicula=>pelicula.id===id)

  
  const name=usuario.usuario.nombre

  const navegate = useNavigate()
  // if(!movie){
  //   return <Navigate to="/notfound"/>
  // }

  const add = ()=>{
    let comment = comentario.current.value
    
    let nombre= name
    
    if(auth.user.name===""){
      alert("Inicia sesión para escribir un comentario")
      navegate("/login")
      
    }else{
      const comentario ={
        comentario:comment,
        name:auth.user.name,
        id:auth.user.id,
        date:new Date(),
        profilePic:auth.user.profilePic
      }
      const comentarios=[]
      peliculas.map((peli)=>{
        if(peli.id===movie.id){
          peli.comentarios.forEach((element)=>{
            comentarios.push(element)
          })
          comentarios.push(comentario)
        }
      })
      console.log(comentarios)
      const docRef = doc(database,`peliculas/${movie.id}`)
      updateDoc(docRef,{
        comentarios:comentarios
      })
      dispatch(getMovies())
      
    }
    
  }
  
 
  const del =(date)=>{
    
    const comentarios=[]
    peliculas.map((peli)=>{
      if(peli.id===movie.id){
        peli.comentarios.forEach((element)=>{
          comentarios.push(element)
        })
        
      }
    })
    const NewComentario = comentarios.filter(com=>com.date!==date)
    console.log(NewComentario)
    const docRef = doc(database,`peliculas/${movie.id}`)
    updateDoc(docRef,{
      comentarios:NewComentario
    })
    dispatch(getMovies())
    
    
    
  }
  
  
  
  const hora = {
    
    dia:(new Date()).getDate(),
    year:(new Date()).getFullYear(),
    mes:(new Date()).getMonth(),

  }
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getMovies())
  },[])
  
  // console.log(movies)
 
  return <Page>
      
      {movie?<SoloPeli movie={movie}></SoloPeli>:<div>Loading....</div>}
      {movie?<Trailer movie={movie}></Trailer>:<></> }
      
      
      <article className='flex flex-col justify-center items-center'>
        <h3 className='text-left text-5xl w-9/12 my-10'> Comentarios</h3>
        <div className='flex flex-col  w-9/12'>
          <textarea ref={comentario} type="text" className='h-40 rounded-md p-2 text-black' placeholder='Dejanos tu comentario'></textarea>
        
          <button onClick={add} className="bg-violet-900 text-left w-[130px] p-2 shadow-sm rounded-md shadow-white">Agregar review</button>
        </div>
      </article>
      
      <div className='flex justify-center '>
        <div className='flex flex-col   bg-violet-300 rounded-md bg-opacity-50 w-9/12 my-10 shadow-md  shadow-white'>
          
            {movie?.comentarios.map(review=><div className=' flex   gap-4 my-5 lg:mx-10 mx-2' key={review.id}>

              
              <img className='max-w-24 lg:w-24 lg:h-24 w-16 h-16 rounded-full' src={review.profilePic} alt="a" />
              
              <div className='w-full '>
                <div className='flex gap-5 items-center   '>
                  <p className='font-bold lg:text-lg text-xs md:h-auto h-4 overflow-hidden '>{review.name}</p>
                  <p className='lg:text-sm text-xs '>{`${review.date.toDate().toLocaleDateString()}`}</p>
                </div>
                
                <p className='text-lg text-left my-2 ' key={review.nombre}>{review.comentario}</p>
                
              </div>

              
              {auth.user.name===review.name?<button className='mx-2 hover:text-red-500' onClick={()=>{del(review.date)}}><FontAwesomeIcon icon={faTrash}/></button>:<></>}
              
            </div> )}
        </div>
      </div>
      
  </Page>;
}