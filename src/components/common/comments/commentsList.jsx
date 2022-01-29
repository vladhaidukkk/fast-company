import React from 'react';
import PropTypes from 'prop-types';
import Comment from './comment';

const CommentsList = ({ data, onDelete }) => (
  data.map((comment) => (
    <Comment
      key={comment.id}
      {...comment}
      onDelete={onDelete}
    />
  ))
);

CommentsList.defaultProps = {
  title: 'Comments',
};

CommentsList.propTypes = {
  data: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CommentsList;
