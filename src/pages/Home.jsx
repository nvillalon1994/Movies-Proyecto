import React, { useContext } from 'react'
import Movies from '../components/Movies'
import Slider from '../components/Slider'
import Page from '../components/Page'

import { moviesContext } from '../context/MoviesContext'
import Footer from '../components/Footer'

export default function Home() {
  const {movies,filtroPeticion,show,categorias} =useContext(moviesContext)
  console.log(categorias)
  return (
    <Page>
      
        <Slider className="slide" movies={movies}></Slider>
        
        <div className='home'>
          <h1 id='titulo'>Películas Online</h1>
          
          

        
        {show?<Movies movies={movies}/>:
        <Movies movies={filtroPeticion}/>}
        
        
        </div>
        <Footer/>
      
        
    </Page>
  )
}
