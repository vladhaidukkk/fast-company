import React, { useState, Fragment } from 'react';
import api from '../api';
import Status from './status';
import User from './user';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleBookmark = (id) => {
    const updatedUsers = users.map((user) => {
      const userCopy = { ...user };
      if (userCopy._id === id) {
        userCopy.isFavourite = !userCopy.isFavourite;
      }

      return userCopy;
    });

    setUsers(updatedUsers);
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user._id !== id);
    setUsers(updatedUsers);
  };

  return (
    <Fragment>
      <h2>
        <Status usersAmount={users.length} />
      </h2>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Имя</th>
            <th scope='col'>Качества</th>
            <th scope='col'>Провфессия</th>
            <th scope='col'>Встретился, раз</th>
            <th scope='col'>Оценка</th>
            <th scope='col'>Избранное</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user._id} {...user} onBookmark={handleBookmark} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Users;
