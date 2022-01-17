import React from 'react';
import PropTypes from 'prop-types';

const Qualities = ({ items }) => items.map((item) => (
  <span key={item.id} className={`badge mx-1 bg-${item.color}`}>
    {item.name}
  </span>
));

Qualities.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Qualities;
