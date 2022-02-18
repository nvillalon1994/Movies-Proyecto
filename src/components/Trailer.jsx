import React from 'react'


export default function Trailer(movie) {
    

  return (
    <section className='trailer'>
        <h1 id='titulo3'>Trailer de {movie.movie.title} </h1>
        <iframe src={movie.movie.trailer} frameborder="0" title={movie.movie.title}></iframe>
    </section>
  )
}
