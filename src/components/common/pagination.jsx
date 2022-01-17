import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = ({
  itemsAmount, itemsOnPage, currentIndex, onPaginate,
}) => {
  const pagesAmount = Math.ceil(itemsAmount / itemsOnPage);
  const pageIndexes = _.range(1, pagesAmount + 1);

  if (pagesAmount === 1) return null;
  return (
    <nav>
      <ul className="pagination">
        {pageIndexes.map((pageIndex) => (
          <li key={`page_${pageIndex}`} className={`page-item${currentIndex === pageIndex ? ' active' : ''}`}>
            <button type="button" className="page-link" onClick={() => onPaginate(pageIndex)}>{pageIndex}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsAmount: PropTypes.number.isRequired,
  itemsOnPage: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  onPaginate: PropTypes.func.isRequired,
};

export default Pagination;
