import { createSlice } from '@reduxjs/toolkit';
import qualityService from '../../services/quality.service';
import { isOutdated } from '../../utils/isOutdated';

const qualitiesSlice = createSlice({
  name: 'qualities',
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
      state.isLoading = true;
      state.lastFetch = Date.now();
    },
    requestFailed(state, action) {
      state.error = action.payload;
      state.isLoading = false;
      state.lastFetch = null;
    },
  },
});

const { received, requested, requestFailed } = qualitiesSlice.actions;

export const fetchQualities = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities;
  const outDate = 15 * 60 * 1000; // 15 minutes

  if (isOutdated(lastFetch, outDate)) {
    dispatch(requested());
    try {
      const { content } = await qualityService.get();
      dispatch(received(content));
    } catch (err) {
      dispatch(requestFailed({ message: err.message }));
    }
  }
};

export const getQualities = () => (state) => state.qualities.entities;

export const getQualitiesLoading = () => (state) => state.qualities.isLoading;

export const getQualitiesByIds = (ids) => (state) => {
  const qualities = [];
  if (state.qualities.entities) {
    for (const id of ids) {
      for (const quality of state.qualities.entities) {
        if (quality._id === id) {
          qualities.push(quality);
          break;
        }
      }
    }
  }
  return qualities;
};

const qualitiesReducer = qualitiesSlice.reducer;
export default qualitiesReducer;
