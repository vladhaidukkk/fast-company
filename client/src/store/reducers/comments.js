import { createAction, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import commentService from '../../services/comment.service';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    received(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    requested(state) {
      state.isLoading = false;
    },
    requestFailed(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreated(state, action) {
      state.entities.push(action.payload);
    },
    commentDeleted(state, action) {
      state.entities = state.entities.filter((comment) => comment._id !== action.payload.id);
    },
  },
});

const { received, requested, requestFailed, commentCreated, commentDeleted } =
  commentsSlice.actions;
const createCommentFailed = createAction('comments/createCommentFailed');
const createCommentRequested = createAction('comments/createCommentRequested');
const deleteCommentFailed = createAction('comments/deleteCommentFailed');
const deleteCommentRequested = createAction('comments/deleteCommentRequested');

export const fetchComments = (id) => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await commentService.getById(id);
    dispatch(received(content));
  } catch (err) {
    const { status, statusText: message } = err.response;
    dispatch(requestFailed({ message, status }));
  }
};

export const createComment = (payload) => async (dispatch, getState) => {
  dispatch(createCommentRequested());
  try {
    const { userId } = getState().users.auth;
    const { content } = await commentService.create({
      ...payload,
      _id: nanoid(),
      userId,
      createdAt: Date.now(),
    });
    dispatch(commentCreated(content));
  } catch {
    dispatch(createCommentFailed());
  }
};

export const deleteComment = (id) => async (dispatch) => {
  dispatch(deleteCommentRequested());
  try {
    await commentService.delete(id);
    dispatch(commentDeleted({ id }));
  } catch (error) {
    dispatch(deleteCommentFailed());
  }
};

export const getComments =
  () =>
  ({ comments }) =>
    comments.entities;
export const getCommentsLoading =
  () =>
  ({ comments }) =>
    comments.isLoading;

const commentsReducer = commentsSlice.reducer;
export default commentsReducer;
