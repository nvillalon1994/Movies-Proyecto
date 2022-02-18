import React,{createContext, useReducer,useState} from 'react';
import loginReducer, { loginInitialState } from '../reducers/loginReducer';
import moviesReducer, { moviesInitialState } from '../reducers/moviesReducer';
import reviewsReducer,{reviewsInitialState} from '../reducers/reviewsReducer';
import userReducer, { userInitialState } from '../reducers/userReducer';

export const moviesContext = createContext()

export default function MoviesContext({children}) {
    
    const [movies,setMovies] = useReducer(moviesReducer,moviesInitialState)
    
    const [reviews,dispatchReviews] = useReducer(reviewsReducer,reviewsInitialState)
    const [array,setArray]=useState([])
    

    const [user,dispatchUser]=useReducer(userReducer,userInitialState)
    const [usuario,dispatchUsuario]=useReducer(loginReducer,loginInitialState)

    
    


    const register = (nombre,contraseña,email)=>{
        dispatchUser({type:'register',nombre:nombre,contraseña:contraseña,email:email})
    }
    const logout =()=>{
        dispatchUsuario({type:'logout'})
    }
    const login=(nombre,contraseña)=>{
        dispatchUsuario({type:'login',nombre:nombre,contraseña:contraseña})
    }
    
    const addRanking =(movie,stars1)=>{
        
        let acum=0
        array.push(stars1)
        array.forEach(element => {
            acum=acum+parseInt(element)
        });
        
        let cantidadVotos=array.length
        

        setMovies({type:'addStars',acum:acum,movie:movie,cantidadVotos:cantidadVotos})
    }

    const addReview = (movie,comment,nombre)=>{
        
        dispatchReviews({type:'addReview',idMovie:movie.id,comment,nombre})
        
    }
    const deleteReview = (review)=>{
        dispatchReviews({type:'deleteReview',review})
        
    }
    // filtro por nombre
    const [show,setShow]=useState(true)
    const [filtroPeticion,actualizarFiltroPeticion]= useState([])
    const [input,setInput]=useState([])
    const filtrarNombre=()=>{
        if(input===" "){         
            setShow(true)
            const filtroPeticion =[]
            actualizarFiltroPeticion(filtroPeticion)
            // console.log(filtroPeticion)
        }else{
            setShow(false)
            const filtroPeticion= movies.movies.filter((movie)=>{
                return movie.title.toUpperCase().includes(input.toUpperCase())
            })
            actualizarFiltroPeticion(filtroPeticion)
            console.log(filtroPeticion)

        }
    }
    const[categorias,setCategorias]=useState()
    const filtrarCategoria=()=>{
        if(categorias===" "){         
            setShow(true)
            const filtroPeticion =[]
            actualizarFiltroPeticion(filtroPeticion)
            console.log(filtroPeticion)
        }else{
            setShow(false)
            const filtroPeticion= movies.movies.filter((movie)=>{
                
                return movie.gender.toUpperCase().includes(categorias.toUpperCase())
            })
            actualizarFiltroPeticion(filtroPeticion)
            console.log(filtroPeticion)

        }
    }
    
    
  return <moviesContext.Provider value={{movies:movies.movies,addReview,reviews:reviews.reviews,register,user,logout,login,usuario,deleteReview,addRanking,show,setShow,filtroPeticion,actualizarFiltroPeticion,setInput,input,filtrarNombre,categorias,setCategorias,filtrarCategoria,array}}>
      {children}
  </moviesContext.Provider>
}
