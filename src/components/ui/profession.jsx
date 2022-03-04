import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getProfessionById, getProfessionsLoading } from '../../store/reducers/professions';

const Profession = ({ id }) => {
  const isLoading = useSelector(getProfessionsLoading());
  const profession = useSelector(getProfessionById(id));

  if (!isLoading) {
    return <p>{profession.name}</p>;
  }
  return `loading...${id}`;
};

Profession.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Profession;
