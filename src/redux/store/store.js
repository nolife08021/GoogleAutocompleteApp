import {configureStore} from '@reduxjs/toolkit';
import {createEpicMiddleware} from 'redux-observable';
import {rootEpic} from '../epics/rootEpic';
import {searchReducer} from '../reducers/searchReducers';
import {createLogger} from 'redux-logger';

const epicMiddleware = createEpicMiddleware();

const logger = createLogger();

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({thunk: false}).concat(epicMiddleware, logger),
});

epicMiddleware.run(rootEpic);
