import { combineReducers, configureStore } from '@reduxjs/toolkit';
import qualitiesReducer from './reducers/qualities';
import professionsReducer from './reducers/professions';
import usersReducer from './reducers/users';
import commentsReducer from './reducers/comments';

const store = configureStore({
  reducer: combineReducers({
    qualities: qualitiesReducer,
    professions: professionsReducer,
    users: usersReducer,
    comments: commentsReducer,
  }),
});

export default store;
