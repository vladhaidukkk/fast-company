import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../common/form/textField';
import CheckboxField from '../common/form/checkboxField';
import { getAuthError, login } from '../../store/reducers/users';

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const loginError = useSelector(getAuthError());

  /* Here I use Validation with Yup library */
  const validationScheme = yup.object().shape({
    password: yup.string()
      .required('Password must be specified')
      .matches(/(?=.*[A-Z])/, 'Password should have at least 1 capital letter')
      .matches(/(?=.*[0-9])/, 'Password should have at least 1 digit')
      .matches(/^\S+$/, 'Password shouldn\'t have any spaces')
      .matches(/(?=.{8,16})/, 'Password length should be more than 8'),
    email: yup.string()
      .required('Email must be specified')
      .email('Email input is invalid'),
  });

  const validate = async () => {
    try {
      await validationScheme.validate(data);
      setErrors({});
      return true;
    } catch (error) {
      setErrors({ [error.path]: error.message });
      return false;
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = (dataItem) => {
    setData((prevState) => ({
      ...prevState,
      [dataItem.name]: dataItem.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validate().then((isValid) => {
      if (!isValid) return;
      const redirect = history.location.state?.from.pathname ? history.location.state.from.pathname : '/';
      dispatch(login(data, redirect));
    });
  };

  return (
    <>
      <h3 className="mb-4">Login</h3>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" name="email" value={data.email} onChange={handleChange} error={errors.email} />
        <TextField label="Password" type="password" name="password" value={data.password} onChange={handleChange} error={errors.password} />
        <CheckboxField onChange={handleChange} name="remember" value={data.remember}>Remember account</CheckboxField>
        {loginError && <p className="text-danger">{loginError.message}</p>}
        <button className="btn btn-primary w-100 mb-3" type="submit" disabled={Object.keys(errors).length !== 0}>Sign in</button>
        <div>
          I does not have an account.
          &nbsp;
          <Link to="/auth/register">Create account</Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
