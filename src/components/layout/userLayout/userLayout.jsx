import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import UserEditLayout from '../userEditLayout';
import UserInfoLayout from '../userInfoLayout';

const UserLayout = ({ id }) => {
  const { status } = useParams();

  if (status === 'edit') {
    return <UserEditLayout id={id} />;
  }
  return <UserInfoLayout id={id} />;
};

UserLayout.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UserLayout;
