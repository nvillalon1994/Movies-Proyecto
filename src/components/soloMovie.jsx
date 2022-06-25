import React, { startTransition, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { moviesContext } from '../context/MoviesContext'
import { useDispatch, useSelector } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { database } from '../config/firebase';
import { getMovies } from '../features/movies/index';
export default function SoloPeli({movie}) {
  console.log(movie.stars.length)
  const auth =useSelector(state=>state.auth)
  const dispatch=useDispatch()
  // console.log(movie.stars/movie.numberOfReviews)
  const {addRanking,array} = useContext(moviesContext)
  const [puntuacion,setPuntuacion] =useState([])
  const [ ranking,setRanking] = useState()
  const rank = ()=>{
    const array =[]
    movie.stars.map((star)=>{
      array.push(star.stars)
    })
    console.log(array)
    let suma =0
    array.forEach((a)=>{
      suma = suma +a
    })
    console.log(suma)
    setRanking(suma)
  }

  const stars=(e)=>{
    dispatch(getMovies())
    console.log(e)
    const myStars={
      id:auth.user.id,
      stars:e
    }
    
    const stars=[]
    
    movie.stars.map((star)=>{
      stars.push(star)
    })
    
    if(stars.length===0){
      
      stars.push(myStars)
      const docRef = doc(database,`peliculas/${movie.id}`)
      updateDoc(docRef,{
        stars:stars
      })
      rank()
      dispatch(getMovies())
    }else{

      const encontro = stars.find(star=>star.id===auth.user.id)
      if(encontro){
        
        const newStars = stars.filter(star=>star.id!==auth.user.id)
          
          newStars.push(myStars)
          
          const docRef = doc(database,`peliculas/${movie.id}`)
          updateDoc(docRef,{
            stars:newStars
          })
          dispatch(getMovies())
          rank()

      }else{
        
        
          stars.push(myStars)
          
          const docRef = doc(database,`peliculas/${movie.id}`)
          updateDoc(docRef,{
            stars:stars
          })
          dispatch(getMovies())
          rank()
      }
    }
    
  }

  useEffect(()=>{
    rank()
  })
  
  

  return (
    <div className="soloPeli " style={{backgroundImage:`url(${movie.imgfondo})`,backgroundRepeat:`no-repeat`,backgroundSize:`100%`,backgroundBlendMode:'color',backgroundColor:'rgba(0, 0, 0,0.6)'}} >
      
        <div className=''>
          
          <img src={movie.img} alt={movie.title} />
        </div>
        
        <div className='detalles'>
            <h2>{movie.title}</h2>
            <p> <span> {movie.description}</span> </p>
            <p>Año: <span>{movie.año}</span> </p>
            <p>Genero: <span>{movie.gender}</span> </p>
            <p>Genero: <span>{movie.gender}</span> </p>
            <p>Ranking <span>{(ranking/movie.stars.length).toFixed(2)}/5</span></p>
            {/* <p>Puntuación: <span>{isNaN(movie.stars/movie.numberOfReviews)?0:(movie.stars/movie.numberOfReviews).toFixed(2)} / 5 estrellas</span></p> */}
            {/* <p>Puntuación: <span>{isNaN(movie.stars)?0:(movie.stars)} / 5 estrellas</span></p> */}
            
            <div className="clasificacion ">
               <p></p>                     
              <input id="radio1" type="radio" name="estrellas" value="5" onClick={()=>{stars(5)}}/>
              <label htmlFor="radio1">★</label>
              <input id="radio2" type="radio" name="estrellas" value="4" onClick={()=>{stars(4)}}/>
              <label htmlFor="radio2">★</label>
              <input id="radio3" type="radio" name="estrellas" value="3" onClick={()=>{stars(3)}}/>
              <label htmlFor="radio3">★</label>
              <input id="radio4" type="radio" name="estrellas" value="2" onClick={()=>{stars(2)}}/>
              <label htmlFor="radio4">★</label>
              <input id="radio5" type="radio" name="estrellas" value="1" onClick={()=>{stars(1)}}/>
              <label htmlFor="radio5">★</label>
        
                                    
      </div>
        </div>
        
    </div>
  )
}
