import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import User from './user';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';

const Users = ({ users, onBookmarkToggle, onDelete }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const itemsOnPage = 5;
  const usersCrop = paginate(users, itemsOnPage, currentIndex);

  const handlePaginate = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Провфессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
          </tr>
        </thead>
        <tbody>
          {usersCrop.map((user) => (
            <User key={user.id} {...user} onBookmarkToggle={onBookmarkToggle} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
      <Pagination
        itemsAmount={users.length}
        itemsOnPage={itemsOnPage}
        currentIndex={currentIndex}
        onPaginate={handlePaginate}
      />
    </>
  );
};

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBookmarkToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Users;
