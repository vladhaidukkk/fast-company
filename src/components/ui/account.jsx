import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.hook';

const Account = () => {
  const { currentUser, logOut } = useAuth();
  const [isOpened, setOpened] = useState(false);

  const toggleDropdown = () => setOpened((prev) => !prev);

  return (
    <div className="dropdown" onClick={toggleDropdown}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <img
          src={currentUser.avatarImg}
          alt="avatar"
          height="40"
          className="rounded-circle me-2 img-responsive"
        />
        <span>{currentUser.name}</span>
      </div>
      <div className={`dropdown-menu ${isOpened ? 'show' : ''}`}>
        <Link to={`/users/${currentUser._id}`} className="dropdown-item">Profile</Link>
        <button type="button" className="dropdown-item" onClick={logOut}>Log out</button>
      </div>
    </div>
  );
};

export default Account;
