import {ofType} from 'redux-observable';
import {from, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {searchPlaceSuccess, searchPlaceError} from '../actions/searchActions';
import {GOOGLE_API_KEY} from '../../constants';

export const searchPlaceEpic = action$ =>
  action$.pipe(
    ofType('SEARCH_PLACE'),
    switchMap(action =>
      from(
        fetch(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${action.payload}&key=${GOOGLE_API_KEY}`,
        ),
      ).pipe(
        switchMap(response => response.json()),
        map(data => searchPlaceSuccess(data.predictions)),
        catchError(error => of(searchPlaceError(error))),
      ),
    ),
  );
