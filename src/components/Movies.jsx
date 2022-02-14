import React from 'react'
import Movie from './Movie'

export default function Movies({movies}) {
  return (
    <section className='movies'>
      
        {movies.map(movie=><Movie key={movie.id} className="home" movie={movie}/>)}
    </section>
  )
}
