import { combineReducers } from "redux";
import movieReducer from './movie';
const myReducer = combineReducers({
    movie: movieReducer,
});

export default myReducer;
