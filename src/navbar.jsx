import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <ul className="nav">
    <li className="nav-item">
      <NavLink to="/" className="nav-link">Main</NavLink>
    </li>
    <li className="nav-item">
      <NavLink to="/login" className="nav-link">Login</NavLink>
    </li>
    <li className="nav-item">
      <NavLink to="/users" className="nav-link">Users</NavLink>
    </li>
  </ul>
);

export default Navbar;
