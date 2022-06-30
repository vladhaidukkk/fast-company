import React from 'react';
import { useHistory } from 'react-router-dom';

const MainLayout = () => {
  const { push } = useHistory();

  const handleStartClick = () => {
    push('/users');
  };

  return (
    <div className="container mt-5">
      <h1>Fast Company</h1>
      <p>The best platform to find new friends and maybe not only friends 😏</p>
      <button type="button" className="btn btn-primary" onClick={handleStartClick}>
        Start
      </button>
    </div>
  );
};

export default MainLayout;
