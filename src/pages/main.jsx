import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
  const { initialize, status, error, progress } = useMockData();

  const handleClick = () => {
    initialize();
  };

  return (
    <div className="container mt-5">
      <h1>Main Page</h1>
      <ul>
        <li>
          Status:&nbsp;
          {status}
        </li>
        <li>
          Progress:&nbsp;
          {progress}%
        </li>
        {error && (
          <li>
            Error:&nbsp;
            {error}
          </li>
        )}
      </ul>
      <button type="button" className="btn btn-primary" onClick={handleClick}>
        initialize data
      </button>
    </div>
  );
};

export default Main;
