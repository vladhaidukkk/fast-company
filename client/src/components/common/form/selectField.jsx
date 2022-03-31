import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({ label, options, name, value, onChange, error, defaultOption }) => {
  const getSelectClasses = () => `form-select ${error ? 'is-invalid' : ''}`;

  const getDefaultOption = () =>
    Object.keys(options).length !== 0 ? defaultOption : 'Loading options...';

  const renderOptions = () =>
    Array.isArray(options)
      ? Object.values(options)
          .map((option) => {
            const values = Object.values(option);
            return {
              value: values[0],
              label: values[1],
            };
          })
          .map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
      : options;

  const handleChange = ({ target }) => onChange({ name, value: target.value });

  return (
    <div className="col mb-4">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        className={getSelectClasses()}
        onChange={handleChange}
      >
        <option disabled value="">
          {getDefaultOption()}
        </option>
        {renderOptions()}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.defaultProps = {
  label: '',
  options: [],
  error: '',
  defaultOption: 'Choose...',
};

SelectField.propTypes = {
  label: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  defaultOption: PropTypes.string,
};

export default SelectField;
