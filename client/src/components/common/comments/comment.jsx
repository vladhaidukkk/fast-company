import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatDate } from '../../../utils/date';
import { getCurrentUserId, getUserById } from '../../../store/reducers/users';

const Comment = ({ _id: id, userId: creatorId, content, createdAt, onDelete }) => {
  const { userId: pageId } = useParams();
  const currentUserId = useSelector(getCurrentUserId());
  const creator = useSelector(getUserById(creatorId));

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="bg-light card-body  mb-3">
      {creator ? (
        <div className="row">
          <div className="col">
            <div className="d-flex flex-start ">
              <img
                src={creator.image}
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
                        {formatDate(createdAt)}
                      </span>
                    </p>
                    {(currentUserId === creatorId || currentUserId === pageId) && (
                      <button
                        type="button"
                        className="btn btn-sm text-primary d-flex align-items-center"
                        onClick={handleDelete}
                      >
                        <i className="bi bi-x-lg" />
                      </button>
                    )}
                  </div>
                  <p className="small mb-0">{content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

Comment.propTypes = {
  _id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Comment;
