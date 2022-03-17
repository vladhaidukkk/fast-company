import React from 'react';
import PropsTypes from 'prop-types';

const Search = ({ placeholder, value, onChange }) => (
  <input
    className="form-control"
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

Search.defaultProps = {
  placeholder: '',
};

Search.propTypes = {
  placeholder: PropsTypes.string,
  value: PropsTypes.string.isRequired,
  onChange: PropsTypes.func.isRequired,
};

export default Search;
