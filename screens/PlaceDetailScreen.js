import React, { useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/HeaderButton';
import iconName from '../constants/iconName';
import { useDispatch } from 'react-redux';
import { deletePlace } from '../store/places-actions';


const PlaceDetailScreen = ({navigation})=>{
  const dispatch = useDispatch();
  const id = navigation.getParam('id');

  const onDeletePlace = useCallback(()=>{
    dispatch(deletePlace(id));
  }, [dispatch, id]);

  useEffect(()=>{
    navigation.setParams({deletePlace:onDeletePlace})
  }, [onDeletePlace]);

  return (
    <View>
      <Text>PlaceDetailScreen</Text>
    </View>
  );
};

export default PlaceDetailScreen;

PlaceDetailScreen.navigationOptions = ({navigation}) => {
  const title = navigation.getParam('title');
  const deletePlace = navigation.getParam('deletePlace');

  return ({
    headerTitle: title,
    headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title='Delete Place'
        iconName={iconName('trash')}
        onPress={deletePlace}
      />
    </HeaderButtons>
  });

};

const style = StyleSheet.create({});