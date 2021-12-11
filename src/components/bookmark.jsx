import React from 'react';
import PropTypes from 'prop-types';

const Bookmark = ({ userId, checked, onBookmarkToggle }) => (
  <button type="button" className="btn" onClick={() => onBookmarkToggle(userId)}>
    {checked ? <i className="bi bi-bookmark-fill" /> : <i className="bi bi-bookmark" />}
  </button>
);

Bookmark.propTypes = {
  userId: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onBookmarkToggle: PropTypes.func.isRequired,
};

export default Bookmark;
