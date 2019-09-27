import React from 'react';
import {Provider} from 'react-redux';
import PlacesNavigation from './navigation/PlacesNavigation';
import store from './store/store';
import { init } from './helpers/db';
import { REACT_APP_MAP_API_KEY } from 'react-native-dotenv'



init()
  .then(()=>{
    console.log('init db success');
  })
  .catch(err=>{
    console.log(err);
  });

export default function App() {
  return (
    <Provider store={store}>
    <PlacesNavigation />
    </Provider>
  );
}
