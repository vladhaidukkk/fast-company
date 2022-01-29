import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import api from '../../api';
import CommentsList from '../common/comments/commentsList';
import CommentForm from '../common/comments/commentForm';

const Comments = () => {
  const { userId } = useParams();
  const [comments, setComments] = useState();

  const orderedComments = _.orderBy(comments, 'createdAt', 'desc');

  useEffect(() => {
    api.comments.getByUserId(userId)
      .then((data) => setComments(data));
  }, []);

  const handleSubmit = (commentData) => {
    api.comments.post({ ...commentData, pageId: userId })
      .then((newComment) => setComments([...comments, newComment]));
  };

  const handleCommentDelete = (id) => {
    api.comments.remove(id)
      .then((id) => setComments((prevComments) => (
        prevComments.filter((comment) => comment.id !== id)
      )));
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
          <CommentsList data={orderedComments} onDelete={handleCommentDelete} />
        </div>
      </div>
    </>
  );
};

export default Comments;
