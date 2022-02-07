import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import userService from '../services/user.service';
import { setTokens } from '../services/localStorage.service';

const httpAuth = axios.create();

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({});
  const [error, setError] = useState(null);

  const catchError = (error) => {
    const message = error.response?.data.message;
    if (message) setError(message);
  };

  const createUser = async (data) => {
    try {
      const { content } = await userService.create(data);
      setUser(content);
    } catch (error) {
      catchError(error);
    }
  };

  const signUp = async ({ email, password, ...rest }) => {
    try {
      const { data } = await httpAuth.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`, {
        email, password, returnSecureToken: true,
      });
      setTokens(data);
      await createUser({ _id: data.localId, email, ...rest });
    } catch (error) {
      const { message, code } = error.response.data.error;

      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = {
            email: 'This email has already been registered',
          };
          throw errorObject;
        }
      }
    }
  };

  const signIn = async ({ email, password }) => {
    try {
      const { data } = await httpAuth.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`, {
        email, password, returnSecureToken: true,
      });
      setTokens(data);
    } catch (error) {
      const { code, message } = error.response.data.error;

      if (code === 400) {
        const errorObject = {};
        if (message === 'EMAIL_NOT_FOUND') {
          errorObject.email = 'Account with this email is not registered';
        } else if (message === 'INVALID_PASSWORD') {
          errorObject.password = 'Password is not correct';
        }
        throw errorObject;
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  return (
    <AuthContext.Provider value={{ signUp, signIn, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
