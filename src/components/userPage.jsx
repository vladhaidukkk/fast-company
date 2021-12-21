import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Qualities from './qualities';
import api from '../api';

const UserPage = ({ id }) => {
  const { push } = useHistory();
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    api.users.fetchUserById(id)
      .then((data) => setUser(data))
      .catch((err) => setError(err));
  }, []);

  const renderAllUsersBtn = () => (
    <button type="button" className="btn btn-secondary" onClick={() => push('/users')}>Все пользователи</button>
  );

  if (error) {
    return (
      <div className="m-2">
        <h2><span className="badge bg-danger">{error.message}</span></h2>
        {renderAllUsersBtn()}
      </div>
    );
  }
  if (!user) {
    return <h2><span className="badge bg-primary m-2">Loading user...</span></h2>;
  }
  return (
    <div className="m-2">
      <h1>{user.name}</h1>
      <h2>
        Профессия:
        {' '}
        {user.profession.name}
      </h2>
      <div><Qualities items={user.qualities} /></div>
      <div>
        completedMeetings:
        {' '}
        {user.completedMeetings}
      </div>
      <h3>
        Rate:
        {' '}
        {`${user.rate}`}
      </h3>
      {renderAllUsersBtn()}
    </div>
  );
};

UserPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UserPage;
