import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import places from './places-reducer';


const store = createStore(
  combineReducers({
    places
  }),
  applyMiddleware(thunk)
);


export default store;


