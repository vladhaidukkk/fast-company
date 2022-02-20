import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import UserCard from '../../ui/userCard';
import QualitiesCard from '../../ui/qualitiesCard';
import Comments from '../../ui/comments';
import CompletedMeetingsCard from '../../ui/completedMeetingsCard';
import { useUsers } from '../../../hooks/useUsers.hook';
import { CommentsProvider } from '../../../hooks/useComments';

const UserLayout = () => {
  const { userId } = useParams();
  const { getUser } = useUsers();
  const { push } = useHistory();
  const user = getUser(userId);

  if (!user) {
    return (
      <div className="m-2">
        <h2><span className="badge bg-danger">User with this id does not exist</span></h2>
        <button type="button" className="btn btn-primary" onClick={() => push('/users')}>All users</button>
      </div>
    );
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
          <CommentsProvider>
            <Comments />
          </CommentsProvider>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
