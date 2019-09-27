import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { REACT_APP_MAP_API_KEY } from 'react-native-dotenv'

const MapPreview = props => {
  const { location, children, onPress } = props;

  // const url = location && `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C${location.lat},${location.lng}&key=${REACT_APP_MAP_API_KEY}`;
  const url = location &&  `https://static-maps.yandex.ru/1.x/?ll=${location.lat},${location.lng}&size=400,200&z=13&l=map&pt=${location.lat},${location.lng},comma`;
  console.log('MapPreview',location, url);
  return (
    <TouchableOpacity style={{ ...styles.mapPreview, ...props.style }} onPress={onPress}>
      {location ? <Image style={styles.mapImage} source={{ uri: url }}/> : children}
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  mapPreview: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
});

export default MapPreview;
