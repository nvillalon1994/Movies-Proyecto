import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../../config/firebase";
import {addDoc, collection,deleteDoc,doc,getDocs,updateDoc,docs,setDoc} from 'firebase/firestore'




export const getMovies = createAsyncThunk("obtenerPelis",async (data,thunkAPI)=>{
    // const idUser=data
    const col = collection(database,"peliculas")
    const snapshot = await getDocs(col)
    const peliculas = []

    snapshot.forEach(doc=>{
      peliculas.push({...doc.data(),id:doc.id})
    })
    
    
    
    return peliculas
})
export const getFiltroBusqueda = createAsyncThunk("filtroBusqueda",async (data,thunkAPI)=>{
    const info = data 
    const state = thunkAPI.getState()
    
    const peliculasFiltradas =[]
    if(info===""){
       
    }else{
        state.peliculas.peliculas.map((peli)=>{
            if(peli.title.toUpperCase().includes(info.toUpperCase())){
                peliculasFiltradas.push(peli)
            }
        })
    }

    return peliculasFiltradas
})
export const getFiltrocategoria = createAsyncThunk("filtrocategoria",async (data,thunkAPI)=>{
    
    const info = data 
    const state = thunkAPI.getState()
    const peliculasFiltradas =[]
    if(info==="todas"){
        state.peliculas.peliculas.map((peli)=>
            peliculasFiltradas.push(peli)
        )
    }else{
        state.peliculas.peliculas.map((peli)=>{
            if(peli.gender===info){
                peliculasFiltradas.push(peli)
            }
        })
    }
    
    return {peliculasFiltradas,info}
})


const moviesSlice = createSlice({
    name:"peliculas",
    initialState:{
        peliculas:[],
        filtro:[],
        filtroCategoria:[],
        loading:false,
        activeFilter:false,
        genero:""
        
    
    },
    reducers:{
     
    },
    extraReducers(builder){
        
        

        
        
        builder.addCase(getMovies.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(getMovies.fulfilled,(state,action)=>{
            state.loading= false
            state.peliculas=action.payload
        })
        builder.addCase(getMovies.rejected,(state,action)=>{
            state.loading = false
        })

        builder.addCase(getFiltroBusqueda.pending,(state,action)=>{
            
        })
        builder.addCase(getFiltroBusqueda.fulfilled,(state,action)=>{
            
            state.filtro=action.payload
        })
        builder.addCase(getFiltroBusqueda.rejected,(state,action)=>{
            
        })

        builder.addCase(getFiltrocategoria.pending,(state,action)=>{
            state.activeFilter = false
        })
        builder.addCase(getFiltrocategoria.fulfilled,(state,action)=>{
            state.activeFilter= true
            state.filtroCategoria=action.payload.peliculasFiltradas
            state.genero=action.payload.info
        })
        builder.addCase(getFiltrocategoria.rejected,(state,action)=>{
            state.activeFilter = false
        })
        
       


    }

})

const moviesReducer = moviesSlice.reducer

export default moviesReducer