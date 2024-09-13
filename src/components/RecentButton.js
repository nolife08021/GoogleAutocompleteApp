import React, {useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const RecentButton = ({actionSheetRef}) => {
  const recentClickHandler = () => {
    actionSheetRef.current.show();
  };
  return (
    <TouchableOpacity
      style={styles.recentButtonContainer}
      onPress={recentClickHandler}>
      <Text style={styles.recentText}>Recent</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recentButtonContainer: {
    backgroundColor: 'white',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    height: 40,
    width: 120,
    elevation: 10,
  },
  recentText: {textAlign: 'center', fontWeight: '600'},
});

export default RecentButton;
