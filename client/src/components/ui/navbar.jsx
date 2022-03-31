import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Account from './account';
import { getIsLoggedIn } from '../../store/reducers/users';

const Navbar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());

  return (
    <div className="navbar bg-light mb-3">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Main
            </NavLink>
          </li>
          {isLoggedIn && (
            <li className="nav-item">
              <NavLink to="/users" className="nav-link">
                Users
              </NavLink>
            </li>
          )}
        </ul>
        <div className="d-flex">
          {isLoggedIn ? (
            <Account />
          ) : (
            <NavLink to="/auth/login" className="nav-link">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
