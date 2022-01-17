import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Qualities from '../../ui/qualities';
import api from '../../../api';

const UserInfoLayout = ({ id }) => {
  const { push } = useHistory();
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    api.users.getById(id)
      .then((data) => setUser(data))
      .catch((err) => setError(err));
  }, []);

  if (error) {
    return (
      <div className="m-2">
        <h2><span className="badge bg-danger">{error.message}</span></h2>
        <button type="button" className="btn btn-primary" onClick={() => push('/users')}>All users</button>
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
        &nbsp;
        {user.profession.name}
      </h2>
      <div><Qualities items={user.qualities} /></div>
      <div>
        completedMeetings:
        &nbsp;
        {user.completedMeetings}
      </div>
      <h3>
        Rate:
        &nbsp;
        {`${user.rate}`}
      </h3>
      <button type="button" className="btn btn-secondary me-2" onClick={() => push(`/users/${user.id}/edit`)}>Edit</button>
      <button type="button" className="btn btn-secondary" onClick={() => push('/users')}>All users</button>
    </div>
  );
};

UserInfoLayout.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UserInfoLayout;
