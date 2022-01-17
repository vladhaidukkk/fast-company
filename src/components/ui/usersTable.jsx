import React from 'react';
import PropTypes from 'prop-types';
import Table, { TableHeader, TableBody } from '../common/table';
import Bookmark from './bookmark';
import Qualities from './qualities';

const UsersTable = ({
  users, onSort, sortedBy, onDelete, onBookmarkToggle,
}) => {
  const columns = {
    name: { path: 'name', name: 'Имя' },
    qualities: { name: 'Качества', component: (user) => <Qualities items={user.qualities} /> },
    profession: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <Bookmark userId={user.id} selected={user.bookmark} onBookmarkToggle={onBookmarkToggle} />),
    },
    delete: {
      component: (user) => (
        <button type="button" className="btn btn-danger" onClick={() => onDelete(user.id)}>
          <i className="bi bi-person-dash" />
        </button>
      ),
    },
  };

  return (
    <Table>
      <TableHeader {...{ columns, onSort, sortedBy }} />
      <TableBody {...{ data: users, columns }} />
    </Table>
  );
};

UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSort: PropTypes.func.isRequired,
  sortedBy: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onBookmarkToggle: PropTypes.func.isRequired,
};

export default UsersTable;
