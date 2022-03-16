import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import userService from "../services/user.service";
import localStorageService, {
  setTokens,
} from "../services/localStorage.service";
import httpAuth from "../services/auth.service";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [currentUser, setUser] = useState();
  const [isLoading, setLoading] = useState(true);
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

  const setCurrentUser = async () => {
    try {
      const { content } = await userService.getCurrentUser();
      setUser(content);
    } catch (error) {
      catchError(error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async ({ email, password, ...rest }) => {
    try {
      const data = await httpAuth.register({ email, password });
      setTokens(data);
      await createUser({ _id: data.localId, email, ...rest });
    } catch (error) {
      const { message, code } = error.response.data.error;

      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "This email has already been registered",
          };
          throw errorObject;
        }
      }
    }
  };

  const signIn = async ({ email, password }) => {
    try {
      const data = await httpAuth.login({ email, password });
      setTokens(data);
      await setCurrentUser();
    } catch (error) {
      const { code, message } = error.response.data.error;

      if (code === 400) {
        const errorObject = {};
        if (message === "EMAIL_NOT_FOUND") {
          errorObject.email = "Account with this email is not registered";
        } else if (message === "INVALID_PASSWORD") {
          errorObject.password = "Password is not correct";
        }
        throw errorObject;
      }
    }
  };

  const logOut = () => {
    localStorageService.removeTokens();
    setUser(null);
    history.push("/");
  };

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      setCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const updateCurrentUser = async (data) => {
    try {
      await userService.patch(currentUser._id, data);
      setUser((prev) => ({ ...prev, ...data }));
    } catch (error) {
      catchError(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        currentUser,
        logOut,
        updateCurrentUser,
      }}
    >
      {!isLoading ? children : "loading..."}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
