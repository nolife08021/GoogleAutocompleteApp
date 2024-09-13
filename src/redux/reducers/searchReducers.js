import {
  SEARCH_PLACE_SUCCESS,
  SEARCH_PLACE_ERROR,
  SAVE_LOCATION,
  CLEAR_SELECTED_LOCATION,
} from '../actions/searchActions';

const initialState = {
  results: [],
  history: [],
  error: null,
  selectedLocation: null,
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_PLACE_SUCCESS:
      const newLocation = action.payload; // This should be an array of locations

      // Flatten the history to simplify duplication checks
      const flattenedHistory = state.history.flat();

      // Check if newLocation already exists in the flattened history
      const existingEntries = newLocation.filter(newItem =>
        flattenedHistory.some(
          item => item.description === newItem.description, // Compare by description or a unique identifier
        ),
      );

      // Remove existing entries from the history
      const updatedHistory = state.history
        .map(group =>
          group.filter(
            item =>
              !existingEntries.some(
                existingItem => existingItem.description === item.description,
              ),
          ),
        )
        .filter(group => group.length > 0); // Remove empty groups

      // Add newLocation to the history
      const newGroups = [...updatedHistory];
      newGroups.push(newLocation);

      return {
        ...state,
        results: action.payload,
        history: newGroups,
      };

    case SEARCH_PLACE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SAVE_LOCATION:
      return {
        ...state,
        selectedLocation: action.payload,
      };
    case CLEAR_SELECTED_LOCATION:
      return {
        ...state,
        selectedLocation: null,
      };
    default:
      return state;
  }
};
