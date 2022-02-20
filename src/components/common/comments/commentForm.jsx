import React, { useState } from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import TextareaField from '../form/textareaField';

const initialData = { content: '' };

const CommentForm = ({ onSubmit }) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});

  /* Here I use Validation with Yup library */
  const validationScheme = yup.object().shape({
    content: yup.string().required('Message can\'t be empty'),
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
      onSubmit(data);
      setData(initialData);
      setErrors({});
    });
  };

  return (
    <div className="card mb-2">
      <div className="card-body ">
        <h3 className="mb-4">New comment</h3>
        <form onSubmit={handleSubmit}>
          <TextareaField label="Message" onChange={handleChange} name="content" value={data.content} error={errors.content} />
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">Publish</button>
          </div>
        </form>
      </div>
    </div>
  );
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CommentForm;
