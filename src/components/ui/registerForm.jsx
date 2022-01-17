import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { validator } from '../../utils/validator';
import api from '../../api';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckboxField from '../common/form/checkboxField';

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '', password: '', profession: '', gender: 'male', qualities: [], acceptLicense: false,
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState();

  const validationConfig = {
    email: {
      isRequired: (dataItem) => (dataItem.trim() === '' ? 'Email must be specified' : undefined),
      isEmail: (dataItem) => (!/^\S+@\S+\.\S+$/.test(dataItem) ? 'Email input is invalid' : undefined),
    },
    password: {
      isRequired: (dataItem) => (dataItem.trim() === '' ? 'Password must be specified' : undefined),
      hasCapital: (dataItem) => (!/[A-Z]/.test(dataItem) ? 'Password should have at least 1 capital letter' : undefined),
      hasDigit: (dataItem) => (!/\d/.test(dataItem) ? 'Password should have at least 1 digit' : undefined),
      noSpaces: (dataItem) => (/\s/.test(dataItem) ? 'Password shouldn\'t have any spaces' : undefined),
      correctLength: (dataItem) => ((dataItem.length < 8 || dataItem.length > 16) ? 'Password length should be from 8 to 16 characters' : undefined),
    },
    profession: {
      isRequired: (dataItem) => (dataItem.trim() === '' ? 'Profession must be specified' : undefined),
    },
    acceptLicense: {
      isRequired: (dataItem) => (!dataItem ? 'You must to accept the license' : undefined),
    },
  };

  const validate = () => {
    const errors = validator(data, validationConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    let mount = true;

    api.professions.getAll().then((data) => mount && setProfessions(data));
    api.qualities.getAll().then((data) => mount && setQualities(data));

    return () => { mount = false; };
  }, []);

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
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };

  return (
    <>
      <h3 className="mb-4">Register</h3>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" name="email" value={data.email} onChange={handleChange} error={errors.email} />
        <TextField label="Password" type="password" name="password" value={data.password} onChange={handleChange} error={errors.password} />
        <SelectField label="Profession" options={professions} name="profession" value={data.profession} onChange={handleChange} error={errors.profession} />
        <RadioField label="Gender" onChange={handleChange} name="gender" options={['male', 'female', 'other']} value={data.gender} />
        <MultiSelectField label="Qualities" name="qualities" options={qualities} onChange={handleChange} defaultValue={data.qualities} />
        <CheckboxField name="acceptLicense" value={data.acceptLicense} onChange={handleChange} error={errors.acceptLicense}>
          Accept the
          &nbsp;
          <Link to="/auth/register/license">license</Link>
        </CheckboxField>
        <button className="btn btn-primary w-100 mb-3" type="submit" disabled={Object.keys(errors).length !== 0}>Sign up</button>
        <div>
          I have an account.
          &nbsp;
          <Link to="/auth/login">Sign in</Link>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
