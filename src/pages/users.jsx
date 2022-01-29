import React from 'react';
import { useParams } from 'react-router-dom';
import UserLayout from '../components/layout/userLayout';
import UsersListLayout from '../components/layout/usersListLayout';
import EditUserLayout from '../components/layout/editUserLayout';

const Users = () => {
  const { userId, status } = useParams();

  if (userId) {
    if (status === 'edit') {
      return <EditUserLayout id={userId} />;
    }
    return <UserLayout id={userId} />;
  }
  return <UsersListLayout />;
};

export default Users;
