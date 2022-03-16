import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const MultiSelectField = ({ label, name, options, onChange, defaultValue }) => {
  const optionsArray = !Array.isArray(options)
    ? Object.values(options).map((option) => {
        const values = Object.values(option);
        return {
          value: values[0],
          label: values[1],
        };
      })
    : options;

  const handleChange = (value) => {
    onChange({ name, value });
  };

  return (
    <div className="col mb-4">
      <label className="form-label">{label}</label>
      <Select
        closeMenuOnSelect={false}
        isMulti
        name={name}
        defaultValue={defaultValue}
        options={optionsArray}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
      />
    </div>
  );
};

MultiSelectField.defaultProps = {
  options: [],
};

MultiSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.array.isRequired,
};

export default MultiSelectField;
