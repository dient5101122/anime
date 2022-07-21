import * as types from '../constants/movie';

let initialState = {
    movie: [],    
}

function myReducer(state = initialState, action) {
    switch (action.type) {
        case types.LIST_ALL:
            return {
                ...state,
                movie: action.payload.data
            }

        default:
            return state;
    }
}

export default myReducer;