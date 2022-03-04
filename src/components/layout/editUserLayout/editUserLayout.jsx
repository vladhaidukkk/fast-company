import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { validator } from '../../../utils/validator';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import MultiSelectField from '../../common/form/multiSelectField';
import { getQualities, getQualitiesLoading } from '../../../store/reducers/qualities';
import { getProfessions } from '../../../store/reducers/professions';
import { getCurrentUserData, updateCurrentUser } from '../../../store/reducers/users';

const EditUserLayout = () => {
  const history = useHistory();
  const { userId } = useParams();
  const professions = useSelector(getProfessions());
  const qualities = useSelector(getQualities());
  const qualitiesLoading = useSelector(getQualitiesLoading());
  const currentUser = useSelector(getCurrentUserData());
  const dispatch = useDispatch();

  const convertToUse = (data) => ({
    name: data.name,
    email: data.email,
    profession: data.profession,
    gender: data.gender,
    qualities: !qualitiesLoading ? data.qualities.map((qualId) => ({
      label: qualities.find((quality) => quality._id === qualId).name,
      value: qualId,
    })) : [],
  });

  const [data, setData] = useState(convertToUse(currentUser));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!qualitiesLoading) {
      setData(() => convertToUse(currentUser));
    }
  }, [qualitiesLoading]);

  const convertToPatch = (data) => ({
    name: data.name,
    email: data.email,
    profession: data.profession,
    gender: data.gender,
    qualities: data.qualities.map((quality) => quality.value),
  });

  const validationConfig = {
    name: {
      isRequired: (dataItem) => (dataItem.trim() === '' ? 'Name must be specified' : undefined),
    },
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

    const newData = convertToPatch(data);
    dispatch(updateCurrentUser(newData));
  };

  const handleCancel = () => history.goBack();

  if (currentUser._id !== userId) {
    history.push(`/users/${userId}`);
  }

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
          options={qualities.map((quality) => ({ label: quality.name, value: quality._id }))}
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

export default EditUserLayout;
