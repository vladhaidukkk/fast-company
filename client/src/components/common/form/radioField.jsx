import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';

const RadioField = ({ label, name, value, onChange, options }) => {
  const handleChange = ({ target }) => onChange({ name, value: target.value });

  return (
    <div className="col mb-4">
      <label className="form-label">{label}</label>
      <div>
        {options.map((option) => (
          <div key={option} className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name={name}
              id={option}
              value={option}
              onChange={handleChange}
              checked={value === option}
            />
            <label className="form-check-label" htmlFor={option}>
              {capitalize(option)}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

RadioField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RadioField;
