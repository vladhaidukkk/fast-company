import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckboxField from '../common/form/checkboxField';
import { useProfessions } from '../../hooks/useProfessions.hook';
import { useQualities } from '../../hooks/useQualities.hook';
import { useAuth } from '../../hooks/useAuth.hook';

const RegisterForm = () => {
  const history = useHistory();

  const [data, setData] = useState({
    email: '', password: '', profession: '', gender: 'male', qualities: [], acceptLicense: false,
  });
  const { professions } = useProfessions();
  const professionsList = professions.map((profession) => (
    { value: profession._id, label: profession.name }
  ));
  const { qualities } = useQualities();
  const qualitiesList = qualities.map((quality) => ({ value: quality._id, label: quality.name }));
  const [errors, setErrors] = useState({});
  const { signUp } = useAuth();

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
    validate();
  }, [data]);

  const handleChange = (dataItem) => {
    setData((prevState) => ({
      ...prevState,
      [dataItem.name]: dataItem.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = { ...data, qualities: data.qualities.map((q) => q.value) };

    try {
      await signUp(newData);
      history.push('/');
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <>
      <h3 className="mb-4">Register</h3>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" name="email" value={data.email} onChange={handleChange} error={errors.email} />
        <TextField label="Password" type="password" name="password" value={data.password} onChange={handleChange} error={errors.password} />
        <SelectField label="Profession" options={professionsList} name="profession" value={data.profession} onChange={handleChange} error={errors.profession} />
        <RadioField label="Gender" onChange={handleChange} name="gender" options={['male', 'female', 'other']} value={data.gender} />
        <MultiSelectField label="Qualities" name="qualities" options={qualitiesList} onChange={handleChange} defaultValue={data.qualities} />
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
