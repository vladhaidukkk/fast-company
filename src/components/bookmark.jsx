import React from 'react';

const Bookmark = (props) => {
  const formatBookmark = () =>
    props.isFavourite ? <i className='bi bi-bookmark-fill' /> : <i className='bi bi-bookmark' />;

  return (
    <button className='btn' onClick={() => props.onBookmark(props.userId)}>
      {formatBookmark()}
    </button>
  );
};

export default Bookmark;
