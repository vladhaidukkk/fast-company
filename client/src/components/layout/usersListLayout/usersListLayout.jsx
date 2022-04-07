import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { paginate } from '../../../utils/paginate';
import GroupList from '../../common/groupList';
import Status from '../../ui/status';
import UsersTable from '../../ui/usersTable';
import Pagination from '../../common/pagination';
import Search from '../../common/search';
import { getProfessions, getProfessionsLoading } from '../../../store/reducers/professions';
import { getCurrentUserId, getUsers } from '../../../store/reducers/users';

const UsersListLayout = () => {
  const USERS_ON_PAGE = 6;

  const currentUserId = useSelector(getCurrentUserId());
  const users = useSelector(getUsers());
  const professions = useSelector(getProfessions());
  const isLoadingProfessions = useSelector(getProfessionsLoading());
  const [searchValue, setSearchValue] = useState('');
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' });
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => setCurrentIndex(1), [selectedProf]);

  let filteredUsers;
  if (searchValue) {
    filteredUsers = users.filter((user) => new RegExp(searchValue, 'i').test(user.name));
  } else if (selectedProf) {
    filteredUsers = users.filter((user) => user.profession === selectedProf);
  } else {
    filteredUsers = users;
  }
  filteredUsers = filteredUsers.filter((user) => user._id !== currentUserId);

  const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
  const usersCrop = paginate(sortedUsers, USERS_ON_PAGE, currentIndex);
  const usersAmount = filteredUsers.length;

  if (usersCrop.length === 0 && usersAmount > 0) {
    setCurrentIndex(currentIndex - 1);
  }

  const handleBookmarkToggle = (id) => {
    // setUsers(users.map((user) => {
    //   if (user.id === id) {
    //     return { ...user, bookmark: !user.bookmark };
    //   }
    //   return user;
    // }));
    console.log(id);
  };

  const handleSearch = ({ target }) => {
    setSearchValue(target.value);
    setSelectedProf(null);
  };

  const handleProfessionSelect = (prof) => {
    setSelectedProf(prof._id);
    setSearchValue('');
  };

  const clearFilter = () => setSelectedProf();

  const handleSort = (newSortBy) => setSortBy(newSortBy);

  const handlePaginate = (index) => setCurrentIndex(index);

  return (
    <div className="d-flex">
      {!isLoadingProfessions && (
        <div className="w-25 p-2">
          {professions && (
            <GroupList
              items={professions}
              onItemSelect={handleProfessionSelect}
              selectedItem={selectedProf}
            />
          )}
          <button type="button" className="btn btn-secondary mt-2" onClick={clearFilter}>
            Очистить фильтр
          </button>
        </div>
      )}
      <div className="p-2 d-flex flex-column w-100">
        <Status usersAmount={usersAmount} />
        <Search placeholder="Search user..." value={searchValue} onChange={handleSearch} />
        {usersAmount > 0 && (
          <UsersTable
            users={usersCrop}
            onSort={handleSort}
            sortedBy={sortBy}
            onBookmarkToggle={handleBookmarkToggle}
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

export default UsersListLayout;
