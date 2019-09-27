import React, { Fragment, useEffect, useState } from 'react';
import { ScrollView, TextInput, StyleSheet, View, Button, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { Formik, } from 'formik';
import * as yup from 'yup';

import Colors from '../constants/Colors';
import { addPlace } from '../store/places-actions';
import ImageSelector from '../components/ImageSelector';
import LocationPicker from '../components/LocationPicker';


const NewPlaceScreen = ({ navigation }) => {
  const [mapLocation, setMapLocation] = useState(null);

  const mapLocationParams = navigation.getParam('location');

  useEffect(() => {
    console.log('mapLocation',mapLocation);
    if (mapLocation) {
      const { latitude: lat, longitude: lng } = mapLocation;
      setMapLocation({ lat, lng });

    }
  }, [mapLocationParams]);

  const dispatch = useDispatch();

  const initialValues = {
    title: '',
    image: null,
    location: null,
  };

  return (
    <ScrollView>
      <View style={style.form}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            const { title, image, location } = values;
            const { lat, lng } = location;
            dispatch(addPlace({ title, image, lat, lng }));
            navigation.goBack();
          }}
          validationSchema={yup.object({
            title: yup.string().required('Title is required'),
            image: yup.string().required('Image is required').nullable(),
            location: yup.object({
              lat: yup.string(),
              lng: yup.string(),
            }).required('Location is required').nullable(),
          })}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors }) => {
            const { title, image, location } = errors;
            return (<Fragment>
                <TextInput
                  style={style.input}
                  onChangeText={handleChange('title')}
                  value={values.title}
                />
                {title && <Text style={style.errorText}>{title}</Text>}
                <ImageSelector onImageTaken={handleChange('image')}/>
                {image && <Text style={style.errorText}>{image}</Text>}
                <LocationPicker onLocationTaken={handleChange('location')} />
                {location && <Text style={style.errorText}>{location}</Text>}
                <Button
                  onPress={handleSubmit}
                  title={'Save Place'}
                  color={Colors.primary}
                />
              </Fragment>
            )
          }}
        </Formik>
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = navData => ({
  headerTitle: 'Add Place',
});

const style = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  }
  ,
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 4,
    marginBottom: 15
  },
  errorText: {
    color: 'red'
  }
});

export default NewPlaceScreen;