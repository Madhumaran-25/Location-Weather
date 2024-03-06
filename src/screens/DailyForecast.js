import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  ImageBackground,
  Image,
  SafeAreaView,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'

const DailyForecast = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState([]);

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
        setLatitude(latitude);
        setLongitude(longitude);
        fetchWeather(latitude, longitude);
        fetchHourlyWeather(latitude, longitude);
      },
      error => {
        console.warn(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const fetchWeather = async (lat, lon) => {
    try {
      const apiKey = 'db02c18b3e0569b84a722240fb09924c';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      const response = await axios.get(apiUrl);

      if (response.status === 200) {
        setWeatherData(response.data);
      } else {
        console.error('Failed to fetch weather data');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchHourlyWeather = async (lat, lon) => {
    try {
      const apiKey = 'db02c18b3e0569b84a722240fb09924c';
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      const response = await axios.get(apiUrl);

      if (response.status === 200) {
        const nextTwoHoursData = response.data.list.slice(0, 3);
        setHourlyWeatherData(nextTwoHoursData);
      } else {
        console.error('Failed to fetch hourly weather data');
      }
    } catch (error) {
      console.error('Error fetching hourly weather data:', error);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const getWeatherImage = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clear':
        return require('../images/weathericons/brokenClouds.png');
      case 'Clouds':
        return require('../images/weathericons/cloudy.png');
      case 'Rain':
        return require('../images/weathericons/rain.png');
      case 'Thunderstorm':
        return require('../images/weathericons/thunderStorm.png');
      case 'Snow':
        return require('../images/weathericons/snow.png');
      case 'Mist':
        return require('../images/weathericons/mist.png');
      default:
        return require('../images/weathericons/sunny.png');
    }
  };

  return (
    <SafeAreaView style={{margin:10}}>
    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
    <View style={{flexDirection:'row' }}>
        <Image style={{height:25, width:30, tintColor:'#fff', marginRight:20, marginTop:5,}} source={require('../images/sidebaropen.png')} title="Open Drawer" />
        <Icon name="refresh" size={30} color='#fff'  onPress={()=>fetchLocation()} />
    </View>
    <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:2,}}>
        <Icon name='star' size={30} color="#fff" style={{marginRight:20,}}/>
        <Icon name='search' size={30} color="#fff" style={{marginRight:5}}/>
    </View>
    </View>
  
      <View
        style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
        {weatherData && (
          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 30, color: '#fff', fontWeight: 'bold'}}>
              {weatherData.name}
            </Text>
            <Text style={{fontSize: 15, color: '#fff'}}>
              {new Date().toLocaleString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </Text>

            <Text style={{fontSize: 100, color: '#fff', fontWeight: 'bold'}}>
              {weatherData.main.temp}°
            </Text>
            {weatherData.weather[0].main && (
              <Image
                style={{height: 50, width: 80}}
                source={getWeatherImage(weatherData.weather[0].main)}
              /> )} 
             
            <Text style={{fontSize: 30, color: '#fff', fontWeight: 'bold'}}>
             {weatherData.weather[0].main}
            </Text>
            <View
              style={{
                width: '90%',
                backgroundColor: '#fff',
                flexDirection: 'row',
                borderRadius: 10,
                padding: 20,
                justifyContent: 'space-between',
                marginTop:30,
              }}>
              <View>
                <Image
                  style={{height: 50, width: 50}}
                  source={require('../images/img.png')}
                />
                <Text>Max Temp: </Text>
                <Text style={{fontWeight: 'bold', color: '#000'}}>
                  {weatherData.main.temp_max} °C
                </Text>
              </View>
              <View>
                <Image
                  style={{height: 50, width: 50}}
                  source={require('../images/humidity.png')}
                />
                <Text>Humidity: </Text>
                <Text style={{fontWeight: 'bold', color: '#000'}}>
                  {weatherData.main.humidity}%
                </Text>
              </View>
              <View>
                <Image
                  style={{height: 50, width: 50}}
                  source={require('../images/wind.png')}
                />
                <Text>Wind Speed: </Text>
                <Text style={{fontWeight: 'bold', color: '#000'}}>
                  {weatherData.wind.speed} m/s
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '90%',
                backgroundColor: '#fff',
                flexDirection: 'row',
                borderRadius: 10,
                padding: 20,
                justifyContent: 'space-between',
                marginTop: 30,
              }}>
              {hourlyWeatherData.map((hourlyData, index) => {
                const currentTime = new Date();
                currentTime.setHours(currentTime.getHours() + index + 1);

                return (
                  <View key={index}>
                    <Text style={{fontSize: 15, color: '#000'}}>
                      {currentTime.toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </Text>
                    <Text> {hourlyData.main.temp} °C</Text>
                    {weatherData.weather[0].main && (
              <Image
                style={{height: 50, width: 65}}
                source={getWeatherImage(weatherData.weather[0].main)}
              /> )} 
                    <Text>{weatherData.weather[0].main}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </View>
      </SafeAreaView>
  );
};

export default DailyForecast;
