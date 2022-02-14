export const loginInitialState ={
    usuario:{},
    
    
}
export default function loginReducer(state,action){
    let newState;
    switch(action.type){
        case 'login':
             const {nombre,contraseña}=action
             newState={usuario:{nombre:nombre,contraseña:contraseña}}
             break
        case 'logout':
            newState={usuario:{}}
        
    }
    return newState

}