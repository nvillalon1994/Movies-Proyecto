import Carousel from 'react-carousel-minimal/dist/components/Carousel';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ImgSlide({movie}) {
  const [description,setDescription]=useState(false)
  const data = [ 
  ];
  
    if(movie.slide===true){
      data.push({
        caption:movie.title,
        image:movie.imgfondo,
        // description:movie.description
      })
    }
    
  
  
  
  // console.log(listOfData)
  const captionStyle = {
    fontSize: '5em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    
  }
  // console.log(description)
  return (
    <section className="slide4">
      
      <Link to={'/details/' + movie.id}  onMouseOver={()=>setDescription(true)}  onMouseOut={()=>setDescription(false)}>
      
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
