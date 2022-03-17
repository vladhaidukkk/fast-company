import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import userService from '../services/user.service';

const UsersContext = React.createContext();

export const useUsers = () => useContext(UsersContext);

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const catchError = (error) => {
    const message = error.response?.data.message;
    if (message) setError(message);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { content } = await userService.get();
        setUsers(content);
        setLoading(false);
      } catch (error) {
        catchError(error);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const getUser = (id) => users.find((user) => user._id === id);

  const updateUser = (id, data) => {
    const userId = users.findIndex((user) => user._id === id);
    users[userId] = { ...users[userId], ...data };
  };

  return (
    <UsersContext.Provider value={{ users, getUser, updateUser }}>
      {!isLoading ? (
        children
      ) : (
        <h2>
          <span className="badge bg-primary m-2">Users loading...</span>
        </h2>
      )}
    </UsersContext.Provider>
  );
};

UsersProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
