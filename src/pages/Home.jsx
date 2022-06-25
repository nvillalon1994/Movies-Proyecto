import React, { useContext, useEffect } from 'react'
import Movies from '../components/Movies'
import Slider from '../components/Slider'
import Page from '../components/Page'
import { useDispatch, useSelector } from 'react-redux'
import { moviesContext } from '../context/MoviesContext'
import Footer from '../components/Footer'
import {getMovies} from '../features/movies/index'
export default function Home() {

  
  const dispatch=useDispatch()
  const {peliculas,activeFilter,filtroCategoria,genero}= useSelector(state=>state.peliculas)
  console.log(peliculas)
  
  useEffect(()=>{
    dispatch(getMovies())
  },[])
  return (
    <Page>
      
        <Slider className="slide" movies={peliculas}></Slider>
        
        <div className='home'>
          <h1 id='titulo'>Películas Online</h1>
          {activeFilter&&<div>
            {genero!=="todas"&&<h2 id='titulo'>{`${genero[0].toUpperCase() + genero.substring(1)}`}</h2>}
          </div>}
          
          {!activeFilter?<Movies movies={peliculas}/>:<Movies movies={filtroCategoria}/>}
          
        
        
        
        </div>
        <Footer/>
      
        
    </Page>
  )
}
