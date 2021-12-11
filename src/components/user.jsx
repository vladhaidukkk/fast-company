import React from 'react';
import PropTypes from 'prop-types';
import Qualities from './qualities';
import Bookmark from './bookmark';

const User = ({
  id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  isFavourite,
  onBookmarkToggle,
  onDelete,
}) => (
  <tr>
    <th scope="row">{name}</th>
    <td>
      <Qualities qualities={qualities} />
    </td>
    <td>{profession.name}</td>
    <td>{completedMeetings}</td>
    <td>{`${rate}/5`}</td>
    <td>
      <Bookmark userId={id} checked={isFavourite} onBookmarkToggle={onBookmarkToggle} />
    </td>
    <td>
      <button type="button" className="btn btn-danger" onClick={() => onDelete(id)}>
        <i className="bi bi-person-dash" />
      </button>
    </td>
  </tr>
);

User.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  isFavourite: PropTypes.bool.isRequired,
  onBookmarkToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default User;
