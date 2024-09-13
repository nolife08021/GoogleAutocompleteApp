export const SEARCH_PLACE = 'SEARCH_PLACE';
export const SEARCH_PLACE_SUCCESS = 'SEARCH_PLACE_SUCCESS';
export const SEARCH_PLACE_ERROR = 'SEARCH_PLACE_ERROR';
export const SAVE_LOCATION = 'SAVE_LOCATION';
export const CLEAR_SELECTED_LOCATION = 'CLEAR_SELECTED_LOCATION';

export const searchPlace = query => ({
  type: SEARCH_PLACE,
  payload: query,
});

export const searchPlaceSuccess = results => ({
  type: SEARCH_PLACE_SUCCESS,
  payload: results,
});

export const searchPlaceError = error => ({
  type: SEARCH_PLACE_ERROR,
  payload: error,
});

export const saveLocation = location => ({
  type: SAVE_LOCATION,
  payload: location,
});

export const clearSelectedLocation = () => ({
  type: CLEAR_SELECTED_LOCATION,
});
