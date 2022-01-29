import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { validator } from '../../../utils/validator';
import api from '../../../api';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import MultiSelectField from '../../common/form/multiSelectField';

const EditUserLayout = ({ id }) => {
  const history = useHistory();
  const [data, setData] = useState();
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState();

  const convertToUse = (data) => ({
    name: data.name,
    email: data.email,
    profession: data.profession.id,
    gender: data.gender,
    qualities: data.qualities.map((quality) => ({
      label: quality.name,
      value: quality.id,
    })),
  });

  const convertToPatch = (data) => ({
    name: data.name,
    email: data.email,
    profession: professions.find((profession) => profession.id === data.profession),
    gender: data.gender,
    qualities: data.qualities.reduce((list, dataQuality) => {
      list.push(Object.values(qualities).find((quality) => quality.id === dataQuality.value));
      return list;
    }, []),
  });

  const validationConfig = {
    email: {
      isRequired: (dataItem) => (dataItem.trim() === '' ? 'Email must be specified' : undefined),
      isEmail: (dataItem) => (!/^\S+@\S+\.\S+$/.test(dataItem) ? 'Email input is invalid' : undefined),
    },
    profession: {
      isRequired: (dataItem) => (dataItem.trim() === '' ? 'Profession must be specified' : undefined),
    },
  };

  const validate = () => {
    const errors = validator(data, validationConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    let mount = true;

    api.users.getById(id)
      .then((data) => mount && setData(convertToUse(data)));
    api.professions.getAll()
      .then((data) => mount && setProfessions(data));
    api.qualities.getAll()
      .then((data) => mount && setQualities(data));

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

    api.users.patch(id, convertToPatch(data));
    history.goBack();
  };

  const handleCancel = () => history.goBack();

  const renderForm = () => (
    <>
      <h3 className="mb-4">Register</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          error={errors.name}
        />
        <TextField
          label="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          error={errors.email}
        />
        <SelectField
          label="Profession"
          options={professions}
          name="profession"
          value={data.profession}
          onChange={handleChange}
          error={errors.profession}
        />
        <RadioField
          label="Gender"
          onChange={handleChange}
          name="gender"
          options={['male', 'female', 'other']}
          value={data.gender}
        />
        <MultiSelectField
          label="Qualities"
          name="qualities"
          options={qualities}
          onChange={handleChange}
          defaultValue={data.qualities}
        />
        <button
          className="btn btn-primary w-100 mb-3"
          type="submit"
          disabled={Object.keys(errors).length !== 0}
        >
          Confirm
        </button>
        <button
          className="btn btn-secondary w-100"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </>
  );

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-6 offset-md-3 shadow p-4 rounded">
          { data ? renderForm() : <h2><span className="badge bg-primary m-2">Loading...</span></h2> }
        </div>
      </div>
    </div>
  );
};

EditUserLayout.propTypes = {
  id: PropTypes.string.isRequired,
};

export default EditUserLayout;
