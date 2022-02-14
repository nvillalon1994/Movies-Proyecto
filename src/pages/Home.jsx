import React, { useContext } from 'react'
import Movies from '../components/Movies'
import Page from '../components/Page'

import { moviesContext } from '../context/MoviesContext'

export default function Home() {
  const {movies,filtroPeticion,show} =useContext(moviesContext)
  return (
    <Page>
      
        
        <div className='home'>
          <p id='titulo'>Películas Online</p>
        {show?<Movies movies={movies}/>:
        <Movies movies={filtroPeticion}/>}
        
        
        </div>
        
      
        
    </Page>
  )
}
