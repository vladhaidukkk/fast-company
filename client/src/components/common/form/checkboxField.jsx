import React from 'react';
import PropTypes from 'prop-types';

const CheckboxField = ({ name, value, onChange, children, error }) => {
  const getInputClasses = () => `form-check-input ${error ? 'is-invalid' : ''}`;

  const handleChange = () => onChange({ name, value: !value });

  return (
    <div className="form-check mb-4">
      <input
        className={getInputClasses()}
        type="checkbox"
        checked={value}
        id={name}
        name={name}
        onChange={handleChange}
      />
      <label className="form-check-label" htmlFor={name}>
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

CheckboxField.defaultProps = {
  error: '',
};

CheckboxField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  error: PropTypes.string,
};

export default CheckboxField;
