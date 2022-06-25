import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit"
import authReducer from "../features/auth"
import moviesReducer from "../features/movies/index"

const store = configureStore({
    reducer:{
        peliculas:moviesReducer,
        auth:authReducer,
        middleware: getDefaultMiddleware({
            serializableCheck: false,
          }),
        
    }
})

export default store