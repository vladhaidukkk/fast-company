import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({ label, name, value, onChange, error }) => {
  const getTextareaClasses = () => `form-control ${error ? 'is-invalid' : ''}`;

  const handleChange = ({ target }) => onChange({ name, value: target.value });

  return (
    <div className="col mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div className="input-group has-validation">
        <textarea
          id={name}
          value={value}
          name={name}
          onChange={handleChange}
          className={getTextareaClasses()}
          rows="3"
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

TextField.defaultProps = {
  error: '',
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default TextField;
