
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Movie({movie}) {
  const [description,setDescription]=useState(false)
  
  // console.log(description)
  return (
    <section className='pelicula'>
      
      <Link to={"/details/" +movie.id} className="movie" onMouseOver={()=>setDescription(true)} onMouseOut={()=>setDescription(false)}>
          <div className='container'>
            <article className='imagen'>
              <img src={movie.img} alt={movie.title} />
              <div className='year' >
                <p className='rank'>{(movie.stars/movie.numberOfReviews).toFixed(2)}/ 5</p>
                <p>{movie.year}</p>
              </div>
            </article>
            
            
            <article className='description'>
              <h2 className='texto'>{movie.title}</h2>
              <p className='texto2'>{movie.description}</p>
              <p>Duracion: {movie.duracion}</p>
            </article>
            <h2>{movie.title}</h2>
          </div>
          
      </Link>
    </section>
  )
}
