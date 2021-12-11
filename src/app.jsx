import React, { Fragment, useState } from 'react';
import api from './api';
import Status from './components/status';
import Users from './components/users';

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleBookmarkToggle = (id) => {
    const usersCopy = [...users];
    const updatedUsers = usersCopy.map((user) => {
      if (user.id === id) {
        user.isFavourite = !user.isFavourite;
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <>
      <Status usersAmount={users.length} />
      { users.length
        ? <Users users={users} onBookmarkToggle={handleBookmarkToggle} onDelete={handleDelete} />
        : null }
    </>
  );
};

export default App;
