import React, { useContext } from 'react'
import ImgSlide from './ImgSlide'
// import Carousel from 'react-carousel-minimal/dist/components/Carousel';
import Carousel from 'nuka-carousel';
import { Link } from 'react-router-dom';
import { moviesContext } from '../context/MoviesContext';

export default function Slider({movies}) {
  const {movie}=useContext(moviesContext)
  
  console.log(movie)
  return (
    <Carousel slidesToShow={1} cellAlign="center" autoplay={true} speed={200}  
    
    
    >
 
        
        {movies.map(movie=><ImgSlide key={movie.id}  movie={movie}/>)}
        
    </Carousel>
  )
}
