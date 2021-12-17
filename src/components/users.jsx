import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import api from '../api';
import { paginate } from '../utils/paginate';
import GroupList from './groupList';
import Status from './status';
import UsersTable from './usersTable';
import Pagination from './pagination';

const Users = () => {
  const USERS_ON_PAGE = 6;
  const [users, setUsers] = useState();
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' });
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => setCurrentIndex(1), [selectedProf]);

  if (!users) {
    return <h2><span className="badge bg-primary m-2">Loading users...</span></h2>;
  }

  const filteredUsers = selectedProf
    ? users.filter((user) => _.isEqual(user.profession, selectedProf))
    : users;
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
  const usersCrop = paginate(sortedUsers, USERS_ON_PAGE, currentIndex);
  const usersAmount = filteredUsers.length;

  if (usersCrop.length === 0 && usersAmount > 0) {
    setCurrentIndex(currentIndex - 1);
  }

  const handleBookmarkToggle = (id) => {
    setUsers(users.map((user) => {
      if (user.id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    }));
  };

  const handleDelete = (id) => setUsers(users.filter((user) => user.id !== id));
  const handleProfessionSelect = (prof) => setSelectedProf(prof);
  const clearFilter = () => setSelectedProf();
  const handleSort = (newSortBy) => setSortBy(newSortBy);
  const handlePaginate = (index) => setCurrentIndex(index);

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
            <UsersTable
              users={usersCrop}
              onSort={handleSort}
              sortedBy={sortBy}
              onBookmarkToggle={handleBookmarkToggle}
              onDelete={handleDelete}
            />
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

export default Users;
