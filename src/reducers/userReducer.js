export const userInitialState ={
    user:[],
    
    
}
export default function userReducer(state,action){
    let newState;
    switch(action.type){
        case 'register':
             const {nombre,email,contraseña}=action
             newState={user:[...state.user,{nombre:nombre,email:email,contraseña:contraseña}]}
            //  newState = {reviews:[...state.reviews,{id:state.lenght,idMovie,comment}]}
             break
        
    }
    return newState

}