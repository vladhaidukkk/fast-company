import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = ({ data, columns, onSort, sortedBy, children }) => (
  <table className="table">
    {children || (
      <>
        <TableHeader {...{ columns, onSort, sortedBy }} />
        <TableBody {...{ data, columns }} />
      </>
    )}
  </table>
);

Table.defaultProps = {
  data: undefined,
  columns: undefined,
  onSort: undefined,
  sortedBy: undefined,
  children: undefined,
};

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.object,
  onSort: PropTypes.func,
  sortedBy: PropTypes.string,
  children: PropTypes.array,
};

export default Table;
