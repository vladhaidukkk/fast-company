import React from 'react';

const Qualities = (props) => {
  const getQualityClasses = (color) => `badge bg-${color} mx-1`;

  return props.qualities.map((quality) => (
    <span key={quality._id} className={getQualityClasses(quality.color)}>
      {quality.name}
    </span>
  ));
};

export default Qualities;
