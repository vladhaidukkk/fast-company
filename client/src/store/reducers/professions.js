import { createSlice } from '@reduxjs/toolkit';
import professionService from '../../services/profession.service';
import { isOutdated } from '../../utils/isOutdated';

const professionsSlice = createSlice({
  name: 'professions',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    received(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    requested(state) {
      state.isLoading = false;
      state.lastFetch = Date.now();
    },
    requestFailed(state, action) {
      state.error = action.payload;
      state.isLoading = false;
      state.lastFetch = null;
    },
  },
});

const { received, requested, requestFailed } = professionsSlice.actions;

export const fetchProfessions = () => async (dispatch, getState) => {
  const { lastFetch } = getState().professions;
  const outDate = 15 * 60 * 1000; // 15 minutes

  if (isOutdated(lastFetch, outDate)) {
    dispatch(requested());
    try {
      const { content } = await professionService.get();
      dispatch(received(content));
    } catch (err) {
      dispatch(requestFailed({ message: err.message }));
    }
  }
};

export const getProfessions =
  () =>
  ({ professions }) =>
    professions.entities;

export const getProfessionsLoading =
  () =>
  ({ professions }) =>
    professions.isLoading;

export const getProfessionById =
  (id) =>
  ({ professions }) => {
    if (professions.entities) {
      return professions.entities.find((prof) => prof._id === id);
    }
    return null;
  };

const professionsReducer = professionsSlice.reducer;
export default professionsReducer;
