import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import api from '../../../api';
import UserCard from '../../ui/userCard';
import QualitiesCard from '../../ui/qualitiesCard';
import Comments from '../../ui/comments';
import CompletedMeetingsCard from '../../ui/completedMeetingsCard';

const UserLayout = ({ id }) => {
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
    <div className="container mt-4">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <UserCard data={user} />
          <QualitiesCard data={user.qualities} />
          <CompletedMeetingsCard amount={user.completedMeetings} />
        </div>
        <div className="col-md-8">
          <Comments />
        </div>
      </div>
    </div>
  );
};

UserLayout.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UserLayout;
