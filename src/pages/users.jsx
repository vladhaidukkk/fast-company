import React from 'react';
import { useParams } from 'react-router-dom';
import UserLayout from '../components/layout/userLayout';
import UsersListLayout from '../components/layout/usersListLayout';

const Users = () => {
  const { userId } = useParams();

  if (userId) {
    return <UserLayout id={userId} />;
  }
  return <UsersListLayout />;
};

export default Users;
