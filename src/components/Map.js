import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {
  View,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
// Get the screen dimensions
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Map = () => {
  const selectedLocation = useSelector(state => state.search.selectedLocation);
  const [currentLocation, setCurrentLocation] = useState(null);

  // Define the initial region for the map
  const initialRegion = {
    latitude: selectedLocation
      ? selectedLocation.lat
      : currentLocation?.latitude || 3.1466,
    longitude: selectedLocation
      ? selectedLocation.lng
      : currentLocation?.longitude || 101.6958,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.0121,
  };

  useEffect(() => {
    if (!selectedLocation) {
      const getLocation = async () => {
        // Check for Android location permission
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message:
                'App needs access to your location to display it on the map',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission denied');
            return;
          }
        }

        // Get the current location
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setCurrentLocation({
              latitude,
              longitude,
            });
          },
          error => console.error(error),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      };

      getLocation();
    }
  }, [selectedLocation]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={initialRegion}>
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude || currentLocation.lat,
              longitude: currentLocation.longitude || currentLocation.lng,
            }}>
            <Image
              source={require('../assets/images/current-location.png')}
              style={{width: 30, height: 30}}
              resizeMode="contain"
            />
          </Marker>
        )}
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude || selectedLocation.lat,
              longitude: selectedLocation.longitude || selectedLocation.lng,
            }}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: screenHeight,
    width: screenWidth,
    zIndex: 1,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
