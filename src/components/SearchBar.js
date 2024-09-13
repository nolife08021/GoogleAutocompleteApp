import React, {useRef, useState} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearSelectedLocation,
  saveLocation,
  searchPlace,
} from '../redux/actions/searchActions';
import {GOOGLE_API_KEY} from '../constants';
navigator.geolocation = require('@react-native-community/geolocation');

const SearchBar = () => {
  const dispatch = useDispatch();
  const ref = useRef();

  const handleSelect = (data, details) => {
    const location = details.geometry.location;
    dispatch(saveLocation(location));
    dispatch(searchPlace(data.description));
  };
  const handleClear = () => {
    ref.current?.clear();
    dispatch(clearSelectedLocation());
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder="Search"
        onPress={(data, details = null) => handleSelect(data, details)} // 'details' gives the complete place information
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
        }}
        fetchDetails={true}
        styles={styles.autoCompleteContainer}
      />
      <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
        <Image
          style={styles.clearImage}
          resizeMode={'contain'}
          source={require('../assets/images/close-circle.png')}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  clearImage: {
    alignSelf: 'center',
    height: 20,
    width: 20,
  },
  autoCompleteContainer: {
    container: {
      width: '90%',
      marginTop: 10,
      alignSelf: 'center',
    },
    poweredContainer: {height: 10},
    powered: {
      height: 80,
      width: 80,
      marginBottom: 12,
    },
    textInputContainer: {width: '100%'},
    textInput: {
      height: 50,
      color: '#5d5d5d',
      paddingHorizontal: 15,
      fontSize: 16,
      paddingRight: 70,
    },
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 10,
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    top: 25,
    width: 50,
    zIndex: 2,
  },
  icon: {
    fontSize: 24,
    color: '#888',
  },
  listView: {
    position: 'absolute',
    top: 60,
    zIndex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default SearchBar;
