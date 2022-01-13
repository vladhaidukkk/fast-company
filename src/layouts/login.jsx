import React, { useEffect, useState } from 'react';
import TextField from '../components/textField';
import { validator } from '../utils/validator';

const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validationConfig = {
    email: {
      isRequired: (data) => (data.trim() === '' ? 'Email must always ne filled' : undefined),
      isEmail: (data) => (!/^\S+@\S+\.\S+$/.test(data) ? 'Email input is invalid' : undefined),
    },
    password: {
      isRequired: (data) => (data.trim() === '' ? 'Password must always ne filled' : undefined),
      hasCapital: (data) => (!/[A-Z]/.test(data) ? 'Password should have at least 1 capital letter' : undefined),
      hasDigit: (data) => (!/\d/.test(data) ? 'Password should have at least 1 digit' : undefined),
      noSpaces: (data) => (/\s/.test(data) ? 'Password shouldn\'t have any spaces' : undefined),
      correctLength: (data) => ((data.length < 8 || data.length > 16) ? 'Password length should be from 8 to 16 characters' : undefined),
    },
  };

  const validate = () => {
    const errorsList = validator(values, validationConfig);
    setErrors(errorsList);
    return Object.keys(errorsList).length === 0;
  };

  useEffect(() => {
    validate();
  }, [values]);

  const handleChange = ({ target }) => {
    setValues((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(values);
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-6 offset-md-3 shadow p-4 rounded">
          <h3 className="mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <TextField label="Email" name="email" value={values.email} onChange={handleChange} error={errors.email} />
            <TextField label="Password" type="password" name="password" value={values.password} onChange={handleChange} error={errors.password} />
            <button className="btn btn-primary w-100" type="submit" disabled={Object.keys(errors).length !== 0}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
