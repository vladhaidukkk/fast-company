import { createSlice, createAction } from '@reduxjs/toolkit';
import userService from '../../services/user.service';
import authService from '../../services/auth.service';
import localStorageService, { setTokens } from '../../services/localStorage.service';
import history from '../../utils/history';
import { getAuthErrorMessage } from '../../utils/getAuthErrorMessage';

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
    };

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    received(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    requested(state) {
      state.isLoading = false;
    },
    requestFailed(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    authenticated(state, action) {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authFailed(state, action) {
      state.error = action.payload;
    },
    userCreated(state, action) {
      if (!state.entities) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    loggedOut(state) {
      state.entities = null;
      state.isLoading = false;
      state.auth = null;
      state.isLoggedIn = false;
      state.dataLoaded = false;
    },
    userUpdated(state, action) {
      const index = state.entities.findIndex((user) => user._id === action.payload._id);
      state.entities[index] = { ...state.entities[index], ...action.payload };
    },
    authRequested(state) {
      state.error = null;
    },
  },
});

const {
  received,
  requested,
  requestFailed,
  authenticated,
  authFailed,
  userCreated,
  loggedOut,
  userUpdated,
  authRequested,
} = usersSlice.actions;
const createUserRequested = createAction('users/createUserRequested');
const createUserFailed = createAction('users/createUserFailed');
const updateUserFailed = createAction('users/updateUserFailed');
const updateUserRequested = createAction('users/updateUserRequested');

export const fetchUsers = () => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await userService.get();
    dispatch(received(content));
  } catch (err) {
    dispatch(requestFailed({ message: err.response }));
  }
};

const createUser = (payload) => async (dispatch) => {
  dispatch(createUserRequested());
  try {
    const { content } = await userService.create(payload);
    dispatch(userCreated(content));
    history.push('/users');
  } catch (err) {
    dispatch(createUserFailed());
  }
};

export const register = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register(payload);
    setTokens(data);
    dispatch(authenticated({ userId: data.localId }));
    dispatch(
      createUser({
        ...payload,
        _id: data.localId,
        completedMeetings: 0,
        rate: 0,
        avatarImg: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
      })
    );
  } catch (err) {
    const { message, code } = err.response.data.error;

    if (code === 400) {
      const errMessage = getAuthErrorMessage(message);
      dispatch(authFailed({ message: errMessage }));
    } else {
      dispatch(authFailed({ message: err.message }));
    }
  }
};

export const login = (payload, redirect) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.login(payload);
    dispatch(authenticated({ userId: data.localId }));
    setTokens(data);
    history.push(redirect);
  } catch (err) {
    const { message, code } = err.response.data.error;

    if (code === 400) {
      const errMessage = getAuthErrorMessage(message);
      dispatch(authFailed({ message: errMessage }));
    } else {
      dispatch(authFailed({ message: err.message }));
    }
  }
};

export const logout = () => (dispatch) => {
  localStorageService.removeTokens();
  dispatch(loggedOut());
  history.push('/');
};

export const updateCurrentUser = (payload) => async (dispatch, getState) => {
  dispatch(updateUserRequested());
  try {
    const id = getState().users.auth.userId;
    const { content } = await userService.patch(id, { _id: id, ...payload });
    dispatch(userUpdated(content));
    history.push(`/users/${id}`);
  } catch (err) {
    dispatch(updateUserFailed());
  }
};

export const getUsers =
  () =>
  ({ users }) =>
    users.entities;
export const getUserById =
  (id) =>
  ({ users }) =>
    users.entities ? users.entities.find((user) => user._id === id) : null;
export const getIsLoggedIn =
  () =>
  ({ users }) =>
    users.isLoggedIn;
export const getDataStatus =
  () =>
  ({ users }) =>
    users.dataLoaded;
export const getCurrentUserId =
  () =>
  ({ users }) =>
    users.auth.userId;
export const getUsersLoadingStatus =
  () =>
  ({ users }) =>
    users.isLoading;
export const getCurrentUserData =
  () =>
  ({ users }) =>
    users.entities ? users.entities.find((user) => user._id === users.auth.userId) : null;
export const getAuthError = () => (state) => state.users.error;

const usersReducer = usersSlice.reducer;
export default usersReducer;
