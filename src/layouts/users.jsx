import React from 'react';
import { useParams } from 'react-router-dom';
import UserPage from '../components/userPage';
import UsersList from '../components/usersList';

const Users = () => {
  const { userId } = useParams();

  if (userId) {
    return <UserPage id={userId} />;
  }
  return <UsersList />;
};

export default Users;
