import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CommentsList from '../common/comments/commentsList';
import CommentForm from '../common/comments/commentForm';
import {
  createComment, deleteComment,
  fetchComments,
  getComments,
  getCommentsLoading,
} from '../../store/reducers/comments';

const Comments = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector(getComments());
  const isLoading = useSelector(getCommentsLoading());

  useEffect(() => {
    dispatch(fetchComments(userId));
  }, [userId]);

  const handleSubmit = (commentData) => {
    dispatch(createComment({ ...commentData, pageId: userId }));
  };

  const handleCommentDelete = (id) => {
    dispatch(deleteComment(id));
  };

  return (
    <>
      <div className="card mb-2">
        {' '}
        <div className="card-body ">
          <CommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body ">
          <h2>Comments</h2>
          <hr />
          {!isLoading ? <CommentsList data={comments} onDelete={handleCommentDelete} /> : 'Loading comments...'}
        </div>
      </div>
    </>
  );
};

export default Comments;
