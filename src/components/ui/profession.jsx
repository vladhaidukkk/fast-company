import React from 'react';
import PropTypes from 'prop-types';
import { useProfessions } from '../../hooks/useProfessions.hook';

const Profession = ({ id }) => {
  const { isLoading, getProfession } = useProfessions();
  const profession = getProfession(id);

  if (!isLoading) {
    return <p>{profession.name}</p>;
  }
  return `loading...${id}`;
};

Profession.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Profession;
