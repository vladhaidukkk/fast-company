import React from 'react';
import { useParams } from 'react-router-dom';
import CommentsList from '../common/comments/commentsList';
import CommentForm from '../common/comments/commentForm';
import useComments from '../../hooks/useComments';

const Comments = () => {
  const { userId } = useParams();
  const {
    isLoading, comments, createComment, deleteComment,
  } = useComments();

  const handleSubmit = async (commentData) => {
    await createComment({ ...commentData, pageId: userId });
  };

  const handleCommentDelete = (id) => {
    deleteComment(id);
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
