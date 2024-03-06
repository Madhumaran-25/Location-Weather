import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const CustomDrawer = ({isVisible, onClose}) => {

  const handleOnClose = () => {
    if (typeof onClose === 'function') {
      onClose(); 
    }
  };
  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={handleOnClose}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../images/sidebaropen.png')}
            />
          </TouchableOpacity>
          <Image
            style={{height: 300, width: 200}}
            source={require('../images/icon.png')}
          />

          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 30, height: 30}}
              source={require('../images/cal.png')}
            />
            <Text
              style={{
                marginLeft: 20,
                fontSize: 20,
                fontWeight: 'bold',
                color: '#000',
                marginTop: 3,
              }}>
              Daily Forecast
            </Text>
          </View>

          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Image
              style={{width: 30, height: 30}}
              source={require('../images/humidity.png')}
            />
            <Text
              style={{
                marginLeft: 20,
                fontSize: 20,
                fontWeight: 'bold',
                color: '#000',
                marginTop: 3,
              }}>
              Today Forecast
            </Text>
          </View>

          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Image
              style={{width: 30, height: 30}}
              source={require('../images/star.jpg')}
            />
            <Text
              style={{
                marginLeft: 20,
                fontSize: 20,
                fontWeight: 'bold',
                color: '#000',
                marginTop: 3,
              }}>
              Saved Locations
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    width: '70%',
    alignSelf: 'flex-start',
    height: '100%',
  },
});
