import React, { useContext, useRef, useState } from 'react';
import { useParams ,Navigate} from 'react-router-dom';
import Movie from '../components/Movie';
import { moviesContext } from '../context/MoviesContext';
import Page from '../components/Page'
import SoloPeli from '../components/soloMovie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Trailer from '../components/Trailer';
//import NotFound from './NotFound';

export default function Details() {
  const [disable,setDisable]=useState(false)
  const {id} = useParams()
  const {movies,reviews,addReview,usuario,deleteReview,addRanking} = useContext(moviesContext)
  const comentario = useRef()
  const rating = useRef()
  
  //const navigate = useNavigate()

  const movie = movies.filter(movie=>movie.id===id)[0]

  const name=usuario.usuario.nombre

 
  if(!movie){
    return <Navigate to="/notfound"/>
  }

  const add = ()=>{
    let comment = comentario.current.value
    
    let nombre= name
    
    if(!nombre){
      alert("Inicia sesión para escribir un comentario")
    }else{
      addReview(movie,comment,nombre)
    }
    
  }
  
 
  const del =(review)=>{
    
    deleteReview(review)
    
    console.log(review)
  }
  
  
  
  const hora = {
    
    dia:(new Date()).getDate(),
    year:(new Date()).getFullYear(),
    mes:(new Date()).getMonth(),

  }
  
  
  // console.log(movies)
 
  return <Page>
      
      <SoloPeli movie={movie}></SoloPeli>
      <Trailer movie={movie}></Trailer>
      <h3 id='titulo3'> Comentarios</h3>
      <div className='comentarios'>
        <textarea ref={comentario} type="text" placeholder='Dejanos tu comentario'></textarea>
       
        <button onClick={add}>Agregar review</button>
      </div>

      
      {reviews.map(review=>review.idMovie===id&&<div className='reviews'>
        
        
        <h3 key={review.id}>{review.nombre}</h3>
        
        <div className='review'>
          <p key={review.nombre}>{review.comment}</p>
          <p>Publicado:{hora.dia}/{hora.mes +1}/{hora.year}</p>
        </div>

        
        {name===review.nombre?<button onClick={()=>{del(review)}}><FontAwesomeIcon icon={faTrash}/></button>:<></>}
        
      </div> )}

      
  </Page>;
}