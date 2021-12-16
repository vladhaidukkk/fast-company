import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import api from '../api';
import GroupList from './groupList';
import Status from './status';
import User from './user';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';

const Users = ({ users, onBookmarkToggle, onDelete }) => {
  const USERS_ON_PAGE = 2;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();

  const filteredUsers = selectedProf
    ? users.filter((user) => _.isEqual(user.profession, selectedProf))
    : users;
  const usersCrop = paginate(filteredUsers, USERS_ON_PAGE, currentIndex);
  const usersAmount = filteredUsers.length;

  if (usersCrop.length === 0 && usersAmount > 0) {
    setCurrentIndex(currentIndex - 1);
  }

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => setCurrentIndex(1), [selectedProf]);

  const handlePaginate = (index) => {
    setCurrentIndex(index);
  };

  const handleProfessionSelect = (prof) => {
    setSelectedProf(prof);
  };

  const clearFilter = () => {
    setSelectedProf();
  };

  return (
    <div className="d-flex">
      {professions && (
        <div className="w-25 p-2">
          <GroupList
            items={professions}
            onItemSelect={handleProfessionSelect}
            selectedItem={selectedProf}
          />
          <button type="button" className="btn btn-secondary mt-2" onClick={clearFilter}>Очистить фильтр</button>
        </div>
      )}
      <div className="p-2 d-flex flex-column w-100">
        <Status usersAmount={usersAmount} />
        { usersAmount > 0
      && (
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
              <User
                key={user.id}
                {...user}
                onBookmarkToggle={onBookmarkToggle}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      )}
        <div className="d-flex justify-content-center">
          <Pagination
            itemsAmount={usersAmount}
            itemsOnPage={USERS_ON_PAGE}
            currentIndex={currentIndex}
            onPaginate={handlePaginate}
          />
        </div>
      </div>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBookmarkToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Users;
