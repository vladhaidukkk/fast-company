import React from 'react';
import { useParams } from 'react-router-dom';
import UserLayout from '../components/layout/userLayout';
import UsersListLayout from '../components/layout/usersListLayout';
import EditUserLayout from '../components/layout/editUserLayout';
import UsersLoader from '../components/ui/hoc/usersLoader';

const Users = () => {
  const { userId, status } = useParams();

  return (
    <UsersLoader>
      { userId
        ? (status === 'edit'
          ? <EditUserLayout id={userId} />
          : <UserLayout id={userId} />
        )
        : <UsersListLayout />}
    </UsersLoader>
  );
};

export default Users;
