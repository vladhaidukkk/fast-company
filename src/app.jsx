import React, { useEffect, useState } from 'react';
import api from './api';
import Users from './components/users';

const App = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleBookmarkToggle = (id) => {
    setUsers(users.map((user) => {
      if (user.id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    }));
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  if (!users) {
    return <h2><span className="badge bg-info m-2">Loading users...</span></h2>;
  }
  return <Users users={users} onBookmarkToggle={handleBookmarkToggle} onDelete={handleDelete} />;
};

export default App;
