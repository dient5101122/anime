import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import myReducer from './reducers/index';
import thunk from 'redux-thunk';

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const store = createStore(
    myReducer,
    applyMiddleware(...middleware)
);
export default store;

// export const store = createStore(myReducer, applyMiddleware(thunk))




