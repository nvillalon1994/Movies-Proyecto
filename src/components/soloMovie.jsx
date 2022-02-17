import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { moviesContext } from '../context/MoviesContext'

export default function SoloPeli({movie}) {
  console.log(movie.stars,)
  console.log(movie.numberOfReviews)
  // console.log(movie.stars/movie.numberOfReviews)
  const {movies,reviews,addReview,usuario,deleteReview,addRanking,array} = useContext(moviesContext)
  const [puntuacion,setPuntuacion] =useState([])
  const rank2=(e)=>{
    let stars1=e.target.value
    addRanking(movie,stars1)
    // console.log(stars1)
  }
  console.log(array)

  return (
    <div className="soloPeli" style={{backgroundImage:`url(${movie.imgfondo})`,backgroundRepeat:`no-repeat`,backgroundSize:`100%`,backgroundBlendMode:'color',backgroundColor:'rgba(0, 0, 0,0.8)'}} >
        <div>
          
          <img src={movie.img} alt={movie.title} />
        </div>
        
        <div className='detalles'>
            <h2>{movie.title}</h2>
            <p> <span> {movie.description}</span> </p>
            <p>Año: <span>{movie.year}</span> </p>
            <p>Genero: <span>{movie.gender}</span> </p>
            <p>Puntuación: <span>{isNaN(movie.stars/movie.numberOfReviews)?0:(movie.stars/movie.numberOfReviews).toFixed(2)} / 5 estrellas</span></p>
            {/* <p>Puntuación: <span>{movie.stars/movie.numberOfReviews} / 5 estrellas</span></p> */}
            <div className="clasificacion ">
               <p></p>                     
              <input id="radio1" type="radio" name="estrellas" value="5" onMouseOver={(e) => {setPuntuacion(e.target.value)}} onClick={rank2}/>
              <label htmlFor="radio1">★</label>
              <input id="radio2" type="radio" name="estrellas" value="4" onMouseOver={(e) => {setPuntuacion(e.target.value)}} onClick={rank2}/>
              <label htmlFor="radio2">★</label>
              <input id="radio3" type="radio" name="estrellas" value="3" onMouseOver={(e) => {setPuntuacion(e.target.value)}} onClick={rank2}/>
              <label htmlFor="radio3">★</label>
              <input id="radio4" type="radio" name="estrellas" value="2" onMouseOver={(e) => {setPuntuacion(e.target.value)}} onClick={rank2}/>
              <label htmlFor="radio4">★</label>
              <input id="radio5" type="radio" name="estrellas" value="1" onMouseOver={(e) => {setPuntuacion(e.target.value)}} onClick={rank2}/>
              <label htmlFor="radio5">★</label>
        
                                    
      </div>
        </div>
        
    </div>
  )
}
