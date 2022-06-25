import React from 'react'


export default function Trailer(movie) {
    

  return (
    <section className='flex  justify-center  my-10 '>
      <article className='w-9/12 '>
        <h1 className='text-left text-3xl w-9/12 my-10 lg:text-5xl '>Trailer de {movie.movie.title} </h1>
        <iframe className='lg:h-[700px]  md:h-[400px] xs:h-[300px] w-full ' src={movie.movie.trailer} frameborder="0" title={movie.movie.title}></iframe>
      </article>
        
    </section>
  )
}
