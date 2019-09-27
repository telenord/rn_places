import React, { useState, useCallback, useEffect } from 'react';

import MapView, { Marker } from 'react-native-maps';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import isAndroid from '../constants/isAndroid';
import Colors from '../constants/Colors';
import { Alert } from 'react-native-web';

const MapScreen = (props) => {
  const [coords, setCoords] = useState(null);
  const [region, setRegion] = useState({
    latitude: 37.0,
    longitude: -122.1,
    latitudeDelta: 0.922,
    longitudeDelta: 0.4
  });

  const {navigation} = props;

  const onMapPress = (event) => {
    setCoords({ ...event.nativeEvent.coordinate });
    setRegion({ ...region, ...event.nativeEvent.coordinate });
  };

  const saveLocation = useCallback(()=>{
    if(!coords){
      Alert.alert('No place was chosen!', 'Choose place!', [{ text: 'Okay' }]);
      return;
    }
    navigation.navigate('NewPlace', {location:coords});
  }, [coords]);

  useEffect(()=>{
    navigation.setParams({saveLocation})
  }, [saveLocation]);

  return (
    <MapView style={style.map} region={region} onPress={onMapPress}>
      {coords && <Marker coordinate={coords}/>}
    </MapView>
  );
};


MapScreen.navigationOptions = ({navigation}) => ({
  headerTitle: 'Choose Place',
  headerRight: <TouchableOpacity
    onPress={navigation.getParam('saveLocation')}
    style={style.headerBtn}>
    <Text style={style.headerBtnText}>Save Place</Text>
  </TouchableOpacity>
});

export default MapScreen;

const style = StyleSheet.create({
  map: { flex: 1 },

  headerBtn: {
    marginHorizontal: 20,
  },
  headerBtnText: {
    color: isAndroid ? "white" : Colors.primary
  }
});