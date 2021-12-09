import React from 'react';

const Status = (props) => {
  const { usersAmount } = props;

  if (usersAmount === 0) {
    return <span className='badge bg-danger'>Никто с тобой не тусанет</span>;
  } else if (usersAmount === 1) {
    return <span className='badge bg-primary'>{`${usersAmount} человек тусанет с тобой сегодня`}</span>;
  } else if (usersAmount > 1 && usersAmount < 5) {
    return <span className='badge bg-primary'>{`${usersAmount} человека тусанут с тобой сегодня`}</span>;
  } else {
    return <span className='badge bg-primary'>{`${usersAmount} человек тусанет с тобой сегодня`}</span>;
  }
};

export default Status;
