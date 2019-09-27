import { ADD_PLACE, FETCH_PLACES } from './places-actions';
import Place from '../models/place';

const initialState = {
  places:[]
};


export default (state= initialState, action)=>{
  const {type,  payload} = action;
  console.log('payload', payload);
  switch (type) {
    case (ADD_PLACE):
      const {title, image, lat, lng, address=''} = payload;
      return {...state, places: state.places.concat( new Place(new Date().toString(), title, image, lat, lng, address) )};
    case (FETCH_PLACES):
      return {...state, places: payload.map(({id,title, image, lat, lng, address=''})=>new Place(id.toString(), title, image,lat, lng, address))};
    default: return state;
  }
}