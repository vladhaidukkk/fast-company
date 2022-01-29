import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import { formatDate } from '../../../utils/date';

const Comment = ({
  id, userId: creatorId, content, createdAt, onDelete,
}) => {
  const [creator, setCreator] = useState();

  useEffect(() => {
    api.users.getById(creatorId)
      .then((data) => setCreator(data))
      .catch((error) => console.log(`Comment id-${creatorId}: ${error}`));
  }, []);

  return (
    <div className="bg-light card-body  mb-3">
      {creator ? (
        <div className="row">
          <div className="col">
            <div className="d-flex flex-start ">
              <img
                src={`https://avatars.dicebear.com/api/avataaars/${(
                  Math.random() + 1
                )
                  .toString(36)
                  .substring(7)}.svg`}
                className="rounded-circle shadow-1-strong me-3"
                alt="avatar"
                width="65"
                height="65"
              />
              <div className="flex-grow-1 flex-shrink-1">
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-1 ">
                      {creator.name}
                      <span className="small">
                        {' - '}
                        {formatDate(Number(createdAt))}
                      </span>
                    </p>
                    <button type="button" className="btn btn-sm text-primary d-flex align-items-center" onClick={() => onDelete(id)}>
                      <i className="bi bi-x-lg" />
                    </button>
                  </div>
                  <p className="small mb-0">{content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : <div>Loading...</div>}
    </div>
  );
};

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Comment;
