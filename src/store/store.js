import { combineReducers, configureStore } from '@reduxjs/toolkit';
import qualitiesReducer from './reducers/qualities';
import professionsReducer from './reducers/professions';

const store = configureStore({
  reducer: combineReducers({
    qualities: qualitiesReducer,
    professions: professionsReducer,
  }),
});

export default store;
