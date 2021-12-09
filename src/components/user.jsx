import React from 'react';
import Qualities from './qualities';
import Bookmark from './bookmark';

const User = (props) => {
  const formatRate = () => `${props.rate}/5`;

  return (
    <tr>
      <th scope='row'>{props.name}</th>
      <td>
        <Qualities qualities={props.qualities} />
      </td>
      <td>{props.profession.name}</td>
      <td>{props.completedMeetings}</td>
      <td>{formatRate()}</td>
      <td>
        <Bookmark userId={props._id} isFavourite={props.isFavourite} onBookmark={props.onBookmark} />
      </td>
      <td>
        <button className='btn btn-danger' onClick={() => props.onDelete(props._id)}>
          <i className='bi bi-person-dash' />
        </button>
      </td>
    </tr>
  );
};

export default User;
