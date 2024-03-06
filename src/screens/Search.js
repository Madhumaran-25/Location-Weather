import {
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const Search = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const API_KEY = 'db02c18b3e0569b84a722240fb09924c';

  const searchWeather = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <ImageBackground
      style={{flex: 1, padding: 10}}
      source={require('../images/searchCity.jpg')}>
      <View style={{flexDirection: 'row'}}>
        <Icon name="arrow-left" size={20} color="white" style={styles.icon} />
        <Text style={styles.searchText}>Search City</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder="City name"
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity onPress={searchWeather} style={styles.searchBtn}>
          <Icon name="search" size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>
            {weather.name}, {weather.sys.country}
          </Text>
          <Text style={styles.weatherText}>
            {weather.weather[0].description}
          </Text>
          <Text style={styles.weatherText}>{weather.main.temp}°C</Text>
        </View>
      )}
    </ImageBackground>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  searchText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 3,
  },
  searchBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    width: 50,
    height: 50,
    marginLeft: 5,
    borderRadius: 10,
  },
  inputBox: {
    width: '80%',
    backgroundColor: '#fff',
    paddingLeft: 10,
    borderRadius: 10,
  },
  weatherContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  weatherText: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 10,
    marginTop: 5,
  },
});
