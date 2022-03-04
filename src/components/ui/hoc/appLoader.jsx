import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUsers, getIsLoggedIn, getUsersLoadingStatus } from '../../../store/reducers/users';
import { fetchQualities } from '../../../store/reducers/qualities';
import { fetchProfessions } from '../../../store/reducers/professions';

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const isUsersLoading = useSelector(getUsersLoadingStatus());

  useEffect(() => {
    dispatch(fetchQualities());
    dispatch(fetchProfessions());
    if (isLoggedIn) dispatch(fetchUsers());
  }, [isLoggedIn]);

  if (isUsersLoading) return <h1>Loading</h1>;
  return (
    children
  );
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default AppLoader;
