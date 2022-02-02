import React from 'react';
import { useParams } from 'react-router-dom';
import UserLayout from '../components/layout/userLayout';
import UsersListLayout from '../components/layout/usersListLayout';
import EditUserLayout from '../components/layout/editUserLayout';
import { UsersProvider } from '../hooks/useUsers.hook';

const Users = () => {
  const { userId, status } = useParams();

  return (
    <UsersProvider>
      { userId
        ? (status === 'edit'
          ? <EditUserLayout id={userId} />
          : <UserLayout id={userId} />
        )
        : <UsersListLayout />}
    </UsersProvider>
  );
};

export default Users;
