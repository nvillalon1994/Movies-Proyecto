
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ImgSlide({movie}) {
  
  const data = [ 
  ];
  
    if(movie.slide===true){
      data.push({
        caption:movie.title,
        image:movie.imgfondo,
        
      })
    }
    
  
  
  
  
  return (
    <section className="slide4">
      
      <Link to={'/details/' + movie.id}  >
      
        <div className='slide3' >
          <img src={movie.imgfondo} alt="" />
          <h1 className='textoSlide'>{movie.title}</h1>
          <h1 className='textoSlide2'>{movie.description}</h1>
          <h1 className='textoSlide3'>{isNaN(movie.stars/movie.numberOfReviews)?0:(movie.stars/movie.numberOfReviews).toFixed(2)}/5 puntos</h1>
            
        </div>
      
          
      
          
          
      </Link>
    </section>
  )
}
