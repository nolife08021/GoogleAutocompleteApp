import React, {useRef} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ActionSheet from 'react-native-actions-sheet';
import RecentButton from './RecentButton';
import {saveLocation, searchPlace} from '../redux/actions/searchActions';
import {GOOGLE_API_KEY} from '../constants';

const SearchHistory = () => {
  const dispatch = useDispatch();
  const history = useSelector(state => state.search.history);
  const actionSheetRef = useRef(null);

  const getCoordinates = address => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address,
    )}&key=${GOOGLE_API_KEY}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          dispatch(saveLocation(data.results[0].geometry.location));
        } else {
          console.log(
            'Geocode was not successful for the following reason: ' +
              data.status,
          );
        }
      })
      .catch(error => console.log(error));
  };

  const clickRecentHandler = item => {
    actionSheetRef.current.hide();
    getCoordinates(item.description);
    dispatch(searchPlace(item.description)); // Dispatch action for selected history item
  };

  if (history && history.length > 0) {
    return (
      <View style={styles.container}>
        <RecentButton actionSheetRef={actionSheetRef} />
        <ActionSheet
          ref={actionSheetRef}
          gestureEnabled={true}
          indicatorStyle={{
            width: 100,
          }}>
          <View style={styles.innerContainer}>
            <Text style={styles.recentSearchText}>{'Recent Search'}</Text>

            <View>
              {history.reverse().map((item, index) => (
                <TouchableOpacity
                  onPress={() => clickRecentHandler(item[0])}
                  key={index}
                  style={styles.historyItemContainer}>
                  <View style={styles.recentImageContainer}>
                    <Image
                      style={styles.recentImage}
                      resizeMode={'contain'}
                      source={require('../assets/images/recent.png')}
                    />
                  </View>
                  <View>
                    <Text style={styles.locationMainText}>
                      {item[0]?.structured_formatting.main_text}
                    </Text>
                    <Text style={styles.locationSubText}>
                      {item[0]?.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ActionSheet>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {flex: 1},
  innerContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  recentSearchText: {fontWeight: '600', fontSize: 12, marginVertical: 10},
  historyItemContainer: {
    flexDirection: 'row',
    paddingRight: 40,
    marginVertical: 12,
  },
  recentImageContainer: {
    marginHorizontal: 5,
    marginRight: 15,
    marginTop: 5,
    backgroundColor: '#dfe6e9',
    height: 25,
    justifyContent: 'center',
    width: 25,
    borderRadius: 30,
  },
  recentImage: {height: 30, width: 30, alignSelf: 'center'},
  locationMainText: {fontWeight: '500'},
  locationSubText: {fontSize: 12},
});

export default SearchHistory;
