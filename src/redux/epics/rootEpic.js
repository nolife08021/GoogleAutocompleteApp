import {combineEpics} from 'redux-observable';
import {searchPlaceEpic} from './searchEpics';

export const rootEpic = combineEpics(searchPlaceEpic);
