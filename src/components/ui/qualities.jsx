import React from 'react';
import PropTypes from 'prop-types';
import { useQualities } from '../../hooks/useQualities.hook';

const Qualities = ({ items }) => {
  const { isLoading, getQuality } = useQualities();

  if (!isLoading) {
    return items.map((item) => {
      const quality = getQuality(item);
      return (
        <span key={quality._id} className={`badge mx-1 bg-${quality.color}`}>
          {quality.name}
        </span>
      );
    });
  }
  return 'loading...';
};

Qualities.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Qualities;
