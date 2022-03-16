import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Comment from "./comment";

const CommentsList = ({ data, onDelete }) => {
  const orderedComments = _.orderBy(data, "createdAt", "desc");

  return orderedComments.map((comment) => (
    <Comment key={comment._id} {...comment} onDelete={onDelete} />
  ));
};

CommentsList.defaultProps = {
  data: [],
};

CommentsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func.isRequired,
};

export default CommentsList;
