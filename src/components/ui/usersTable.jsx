import React from 'react';
import PropTypes from 'prop-types';
import Table, { TableHeader, TableBody } from '../common/table';
import Bookmark from './bookmark';
import Qualities from './qualities';
import Profession from './profession';

const UsersTable = ({
  users, onSort, sortedBy, onBookmarkToggle,
}) => {
  const columns = {
    name: { path: 'name', name: 'Имя' },
    qualities: { name: 'Качества', component: (user) => <Qualities items={user.qualities} /> },
    profession: { name: 'Профессия', component: (user) => <Profession id={user.profession} /> },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <Bookmark
          userId={user._id}
          selected={false}
          onBookmarkToggle={onBookmarkToggle}
        />
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
  onBookmarkToggle: PropTypes.func.isRequired,
};

export default UsersTable;
