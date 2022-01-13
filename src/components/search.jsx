import React from 'react';
import PropsTypes from 'prop-types';

const Search = ({ value, onChange }) => (
  <input className="form-control" type="text" value={value} onChange={onChange} placeholder="Search user..." />
);

Search.propTypes = {
  value: PropsTypes.string.isRequired,
  onChange: PropsTypes.func.isRequired,
};

export default Search;
