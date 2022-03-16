import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ columns, onSort, sortedBy }) => {
  const renderContent = (column) => {
    if (sortedBy.iter === columns[column].path) {
      if (sortedBy.order === "asc") {
        return (
          <>
            <span>{columns[column].name}</span>
            <i className="bi bi-caret-down-fill" />
          </>
        );
      }
      return (
        <>
          <span>{columns[column].name}</span>
          <i className="bi bi-caret-up-fill" />
        </>
      );
    }
    return columns[column].name;
  };

  const handleSort = (name) => {
    if (sortedBy.iter === name) {
      onSort({ ...sortedBy, order: sortedBy.order === "asc" ? "desc" : "asc" });
    } else {
      onSort({ iter: name, order: "asc" });
    }
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            scope="col"
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            role={columns[column].path && "button"}
          >
            {renderContent(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  sortedBy: PropTypes.object.isRequired,
};

export default TableHeader;
