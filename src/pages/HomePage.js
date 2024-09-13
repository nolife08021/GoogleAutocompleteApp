import React from 'react';
import {View} from 'react-native';
import SearchBar from '../components/SearchBar';
import Map from '../components/Map';
import SearchHistory from '../components/SearchHistory';

const HomePage = () => {
  return (
    <View style={{flex: 1}}>
      <Map />
      <SearchBar />
      <SearchHistory />
    </View>
  );
};

export default HomePage;
