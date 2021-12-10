import React from 'react';
import PropTypes from 'prop-types';

const Qualities = ({ qualities }) => qualities.map((quality) => (
  <span key={quality.id} className={`badge mx-1 bg-${quality.color}`}>
    {quality.name}
  </span>
));

Qualities.propTypes = {
  qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Qualities;
