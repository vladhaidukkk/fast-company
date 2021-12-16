import React from 'react';
import PropTypes from 'prop-types';

const GroupList = ({
  items, onItemSelect, uniqueProp, contentProp, selectedItem,
}) => (
  <div className="list-group">
    {Object.values(items).map((item) => (
      <button
        key={item[uniqueProp]}
        type="button"
        className={`list-group-item list-group-item-action${item === selectedItem ? ' active' : ''}`}
        onClick={() => onItemSelect(item)}
      >
        {item[contentProp]}
      </button>
    ))}
  </div>
);

GroupList.defaultProps = {
  uniqueProp: 'id',
  contentProp: 'name',
  selectedItem: undefined,
};

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  onItemSelect: PropTypes.func.isRequired,
  uniqueProp: PropTypes.string,
  contentProp: PropTypes.string,
  selectedItem: PropTypes.object,
};

export default GroupList;
