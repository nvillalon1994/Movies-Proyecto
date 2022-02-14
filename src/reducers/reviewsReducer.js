export const reviewsInitialState = {
    reviews:[]
}

export default function reviewsReducer(state,action){
    
    let newState;
    switch(action.type){
        case 'addReview':
            const {idMovie,comment,nombre} = action
            newState = {reviews:[...state.reviews,{id:state.reviews.length,idMovie,comment,nombre}]}
            break;
        case 'deleteReview':
            const {review} = action
            let nuevo = state.reviews.filter(e=>e.id!==review.id)
            newState={reviews:[...nuevo]}
            break;
    }
    return newState
}