import React, { useState, Fragment } from 'react';
import api from '../api';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const renderCounter = () => {
    if (users.length === 0) {
      return <span className='badge bg-danger'>Никто с тобой не тусанет</span>;
    } else if (users.length === 1) {
      return <span className='badge bg-primary'>{`${users.length} человек тусанет с тобой сегодня`}</span>;
    } else if (users.length > 1 && users.length < 5) {
      return <span className='badge bg-primary'>{`${users.length} человека тусанут с тобой сегодня`}</span>;
    } else {
      return <span className='badge bg-primary'>{`${users.length} человек тусанет с тобой сегодня`}</span>;
    }
  };

  const handleDeletion = (id) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== id));
  };

  return (
    <Fragment>
      <h2>{renderCounter()}</h2>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Имя</th>
            <th scope='col'>Качества</th>
            <th scope='col'>Провфессия</th>
            <th scope='col'>Встретился, раз</th>
            <th scope='col'>Оценка</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <th scope='row'>{user.name}</th>
                <td>
                  {user.qualities.map((quality) => {
                    return (
                      <span key={quality._id} className={`badge bg-${quality.color} mx-1`}>
                        {quality.name}
                      </span>
                    );
                  })}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{`${user.rate}/5`}</td>
                <td>
                  <button className='btn btn-danger' onClick={() => handleDeletion(user._id)}>
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Users;
