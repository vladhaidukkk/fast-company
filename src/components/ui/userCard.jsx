import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const UserCard = ({ data }) => {
  const { push } = useHistory();

  return (
    <div className="card mb-3">
      <div className="card-body">
        <button type="button" className="position-absolute top-0 end-0 btn btn-light btn-sm" onClick={() => push(`/users/${data.id}/edit`)}>
          <i className="bi bi-gear" />
        </button>
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img
            src={`https://avatars.dicebear.com/api/avataaars/${(
              Math.random() + 1
            )
              .toString(36)
              .substring(7)}.svg`}
            className="rounded-circle"
            width="150"
            alt="User avatar"
          />
          <div className="mt-3">
            <h4>{data.name}</h4>
            <p className="text-secondary mb-1">{data.profession.name}</p>
            <div className="text-muted">
              <i className="bi bi-caret-down-fill text-primary" role="button" />
              <i className="bi bi-caret-up text-secondary" role="button" />
              <span className="ms-2">{data.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default UserCard;
