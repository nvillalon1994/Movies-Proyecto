import React, { useContext } from 'react'
import ImgSlide from './ImgSlide'
// import Carousel from 'react-carousel-minimal/dist/components/Carousel';
import Carousel from 'nuka-carousel';
import { Link } from 'react-router-dom';
import { moviesContext } from '../context/MoviesContext';

export default function Slider({movies}) {
  const {movie}=useContext(moviesContext)
  const data = [ 
  ];
  movies.map((movie)=>{
    if(movie.slide===true){
      data.push({
        caption:movie.title,
        image:movie.imgfondo,
        // description:movie.description
      })
    }
    
  }
    )
  
  // console.log(listOfData)
  const captionStyle = {
    fontSize: '5em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    
  }
  console.log(movie)
  return (
    <Carousel slidesToShow={1} cellAlign="center" autoplay={3000} speed={200}
    
    // className='slide'
    >
 
        {/* {movies.map(movie=><ImgSlide key={movie.id} className="home" movie={movie}/>)} */}
        {movies.map(movie=><ImgSlide key={movie.id}  movie={movie}/>)}
        {/* <Carousel
            data={data}
            time={5000}
            width="1366px"
            height="500px"
            captionStyle={captionStyle}
            radius="10px"
            slideNumber={false}
            slideNumberStyle={slideNumberStyle}
            captionPosition="center"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={false}
            thumbnailWidth="100px"
            style={{
              textAlign: "top",
              maxWidth: "1366px",
              maxHeight: "500px",
              margin: "0px auto",
            }}
          /> */}
    </Carousel>
  )
}
