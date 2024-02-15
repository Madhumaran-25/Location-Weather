import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  PermissionsAndroid,
  Button,
  Image, ImageBackground
} from 'react-native';
import React, {useState} from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
import DailyForecast from './src/screens/DailyForecast';
import SavedLocations from './src/screens/SavedLocations';
import CustomDrawer from './src/screens/Drawer';
import MainComponent from './src/screens/MainComponent';
import Geolocation from '@react-native-community/geolocation';
import OpenCageGeocode from 'opencage-api-client';
import Search from './src/screens/Search';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome'

// const Drawer = createDrawerNavigator();

const App = () => {

  const [isDrawerVisible, setIsDrawerVisible] = useState();

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false); 
  };
  const handleOpenDrawer = () => {
    setIsDrawerVisible(true); // Set the state to open the drawer/modal
  };


  return(

    <Search/>
    
    // <ImageBackground style={{flex: 1, padding:10}} source={require('./src/images/1.jpg')}>
    
    // <CustomDrawer isVisible={isDrawerVisible} onClose={handleCloseDrawer} />
   
    // <DailyForecast/>
    // </ImageBackground>
    
  )
  };


export default App;

const styles = StyleSheet.create({});
