import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { fetchUsers, getDataStatus } from "../../../store/reducers/users";

const UsersLoader = ({ children }) => {
  const dispatch = useDispatch();
  const dataLoaded = useSelector(getDataStatus());

  useEffect(() => {
    if (!dataLoaded) dispatch(fetchUsers());
  }, []);

  if (!dataLoaded) return <h1>Loading users...</h1>;
  return children;
};

UsersLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default UsersLoader;
