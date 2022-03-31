import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TextField = ({ label, type, name, value, onChange, error }) => {
  const isPassword = type === 'password';
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const toggleTextVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const getInputClasses = () => `form-control ${error ? 'is-invalid' : ''}`;

  const handleChange = ({ target }) => onChange({ name, value: target.value });

  return (
    <div className="col mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div className="input-group has-validation">
        <input
          id={name}
          type={passwordVisibility ? 'text' : type}
          value={value}
          name={name}
          onChange={handleChange}
          className={getInputClasses()}
        />
        {isPassword && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleTextVisibility}
          >
            {passwordVisibility ? <i className="bi bi-eye-slash" /> : <i className="bi bi-eye" />}
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

TextField.defaultProps = {
  type: 'text',
  error: '',
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default TextField;
