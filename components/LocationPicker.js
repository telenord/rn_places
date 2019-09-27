import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as Constants from 'expo-constants';
import { withNavigation } from 'react-navigation';

import MapPreview from './MapPreview';
import Colors from '../constants/Colors';
import isAndroid from '../constants/isAndroid';

const LocationPicker = props => {
  const [location, setLocation] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { onLocationTaken, navigation } = props;

  const mapLocation = navigation.getParam('location');

  console.log('mapLocation',mapLocation);
  useEffect(() => {
    console.log('mapLocation',mapLocation);
    if (mapLocation) {
      const { latitude: lat, longitude: lng } = mapLocation;
      setLocation({ lat, lng });
      onLocationTaken({ lat, lng });
    }
  }, [mapLocation, onLocationTaken]);


  const getPermissions = async () => {
    if (isAndroid && !Constants.isDevice) {
      Alert.alert('Not real device!', 'Oops, this will not work on Sketch in an Android emulator!', [{ text: 'Okay' }]);
      return false;
    }

    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('Insufficient permissions!', 'Sorry, we need location permissions to make this work!', [{ text: 'Okay' }]);
      return false;
    }
    return true;
  };

  const getLocation = async () => {
    const hasPermission = await getPermissions();
    if (!hasPermission) return;

    try {
      setLoading(true);
      const location = await Location.getCurrentPositionAsync({ timeout: 5000 });

      if (location) {
        const { coords: { latitude: lat, longitude: lng } } = location;
        setLocation({ lat, lng });
        onLocationTaken({ lat, lng });
        setLoading(false);
      }

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const onPickLocation = () => {
    const { navigation } = props;
    navigation.navigate('Map')
  };

  return (
    <View style={styles.imagePicker}>
      <MapPreview
        location={location}
        style={styles.mapPreview}
        onPress={onPickLocation}
      >
        {isLoading ?
          (<ActivityIndicator size="large" color={Colors.primary}/>) :
          (<Text>No location picked yet.</Text>)
        }
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get my location"
          color={Colors.primary}
          onPress={getLocation}
        />
        <Button
          title="Pick location"
          color={Colors.primary}
          onPress={onPickLocation}
        />
      </View>
    </View>

  )
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center'
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
    borderColor: Colors.primary,
    borderWidth: 1
  },
  imagePreview: {
    height: 200,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  mapPreview: {
    height: 150,
    width: '100%',
    marginBottom: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }

});

export default withNavigation(LocationPicker);
