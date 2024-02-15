import { StyleSheet, Text, View, TouchableOpacity, Platform, PermissionsAndroid } from 'react-native'
import React, {useState} from 'react';
import OpenCageGeocode from 'opencage-api-client';
import Geolocation from '@react-native-community/geolocation';

const MainComponent = () => {
  const [address, setAddress] = useState('');

  const fetchLocation = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'This app needs access to your location to show your address.',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.warn('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log(latitude, longitude);
        reverseGeocode(latitude, longitude);
      },
      error => {
        console.warn(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await OpenCageGeocode.geocode({
        q: `${latitude},${longitude}`,
        key: 'adb0a7d98f79474b86c9aa9da7dcb32c',
      });
      if (!response.results || response.results.length === 0) {
        const geocodingResponse = await Geocoding.from({latitude, longitude});
        const CurrentLocation = geocodingResponse.results[0].formatted;
        var locationWithoutHyphen = CurrentLocation.replace(/-/g, '');
        setAddress(locationWithoutHyphen);
      } else {
        const CurrentLocation = response.results[0].formatted;
        var locationWithoutHyphen = CurrentLocation.replace(/-/g, '');
        setAddress(locationWithoutHyphen);
      }
    } catch (error) {
      console.warn('Error:', error.message);
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={fetchLocation}>
        <Text
          style={{
            fontSize: 30,
            borderWidth: 1,
            backgroundColor: 'blue',
            color: '#fff',
          }}>
          Show Location
        </Text>
        <Text>{address}</Text>
      </TouchableOpacity>
    </View>
  );
};


export default MainComponent

const styles = StyleSheet.create({})