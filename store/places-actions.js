import * as FS from 'expo-file-system';
import { REACT_APP_GEO_API_KEY } from 'react-native-dotenv'
import { deletePlaceById, insertPlace, selectPlaces } from '../helpers/db';
import getAddress from '../constants/getAddress';


export const ADD_PLACE = 'ADD_PLACE';
export const DELETE_PLACE = 'DELETE_PLACE';
export const FETCH_PLACES = 'FETCH_PLACES';


export const addPlace = payload => {
  return async dispatch => {
    const { image, title, lat, lng } = payload;

    const fileName = image.split('/').pop();
    const newPath = FS.documentDirectory + fileName;
    try {
      await FS.moveAsync({ from: image, to: newPath });

      const address = await getAddress(lat, lng);

      const dbResult = await insertPlace([title, newPath, address, lat, lng]);

      dispatch({
        type: ADD_PLACE,
        payload: { ...payload, id: dbResult.insertId.toString(), image: newPath, address }
      });

    } catch (err) {
      console.log(err);
      throw err;
    }
  }


};

export const fetchPlaces = () => {
  return async dispatch => {

    try {
      const dbResult = await selectPlaces();
      console.log('dbResult', dbResult, dbResult.rows);
      dispatch({
        type: FETCH_PLACES,
        payload: dbResult.rows._array
      });

      return;
    } catch (err) {
      console.log(err);
      throw err;
    }

    dispatch({
      type: FETCH_PLACES,
      payload: []
    });

  }
};


export const deletePlace = (id) => {
  return async dispatch => {

    try {
      const dbResult = await deletePlaceById(id);
      // console.log('dbResult', dbResult);
      dispatch(fetchPlaces());

      return;
    } catch (err) {
      console.log(err);
      throw err;
    }

  }
};

