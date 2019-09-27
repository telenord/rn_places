import React, {useEffect} from 'react';
import { Text,  StyleSheet, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import CustomHeaderButton from '../components/HeaderButton';
import iconName from '../constants/iconName';
import Place from '../components/Place';
import { fetchPlaces } from '../store/places-actions';


const PlaceListScreen = props => {
  const { places } = useSelector(state => state.places);

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchPlaces());
  }, [dispatch]);

  if (!places.length) {
    return <Text>No places added!</Text>
  }

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={({ item }) => {
        const { title, id, } = item;
        return (
          <Place
            {...item}
            title={title}
            onSelect={() => props.navigation.navigate('PlaceDetail', { title, id })}
          />)
      }}
    />
  );
};

PlaceListScreen.navigationOptions = navData => ({
  headerTitle: 'All Places',
  headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    <Item
      title='Add Place'
      iconName={iconName('add')}
      onPress={() => navData.navigation.navigate('NewPlace')}
    />
  </HeaderButtons>
});

const style = StyleSheet.create({});


export default PlaceListScreen;