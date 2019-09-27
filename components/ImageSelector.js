import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Image, Alert } from 'react-native';
import Colors from '../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const ImageSelector = props => {
  const [image, setImage] = useState(null);


  const getPermissions = async () => {
    const { status: statusRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted' || statusRoll !== 'granted') {
      Alert.alert('Insufficient permissions!', 'Sorry, we need camera roll permissions to make this work!', [{ text: 'Okay' }]);
      return false;
    }
    return true;

  };

  const getImage = async () => {
    const hasPermission = await getPermissions();
    if (!hasPermission) return;
    const { onImageTaken } = props;

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });


    if (!image.cancelled) {
      setImage(image.uri);
      onImageTaken && onImageTaken(image.uri)
    }

  };
  return (
    <View style={styles.imagePicker}>
      {!image ?
        (<Text>No image picked yet.</Text>) :
        (<Image source={{ uri: image }} style={{ width: 200, height: 200 }}/>)
      }
      <Button
        title="Take image"
        color={Colors.primary}
        onPress={getImage}
      />
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

});

export default ImageSelector;
