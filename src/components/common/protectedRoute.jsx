import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/useAuth.hook';

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
          return (
            <Redirect to={{
              pathname: '/auth/login',
              state: { from: props.location },
            }}
            />
          );
        }
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
};

ProtectedRoute.defaultProps = {
  location: undefined,
  component: null,
  children: null,
};

ProtectedRoute.propTypes = {
  location: PropTypes.object,
  component: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default ProtectedRoute;
