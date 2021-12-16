import React from 'react';
import PropTypes from 'prop-types';

const Status = ({ usersAmount }) => {
  const formatStatus = () => {
    if (usersAmount === 0) {
      return <span className="badge bg-danger">Никто с тобой не тусанет</span>;
    } if (usersAmount === 1) {
      return <span className="badge bg-primary">{`${usersAmount} человек тусанет с тобой сегодня`}</span>;
    } if (usersAmount > 1 && usersAmount < 5) {
      return <span className="badge bg-primary">{`${usersAmount} человека тусанут с тобой сегодня`}</span>;
    }
    return <span className="badge bg-primary">{`${usersAmount} человек тусанет с тобой сегодня`}</span>;
  };

  return <h2>{formatStatus()}</h2>;
};

Status.propTypes = {
  usersAmount: PropTypes.number.isRequired,
};

export default Status;
