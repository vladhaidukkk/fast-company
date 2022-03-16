import { useEffect, useState } from 'react';
import httpService from '../services/http.service';
import professions from '../mockData/professions.json';
import qualities from '../mockData/qualities.json';
import users from '../mockData/users.json';

const useMockData = () => {
  const statusConsts = {
    idle: 'Not Started',
    pending: 'In Process',
    successed: 'Ready',
    error: 'Error occurred',
  };
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(statusConsts.idle);
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const summaryCount = professions.length + qualities.length + users.length;

  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };

  const countProgress = () => {
    const newProgress = Math.floor((count / summaryCount) * 100);
    if (newProgress === 100) {
      setStatus(statusConsts.successed);
    }
    setProgress(() => newProgress);
  };

  useEffect(() => {
    if (status === statusConsts.idle && count !== 0) {
      setStatus(statusConsts.pending);
    }
    countProgress();
  }, [count]);

  const initialize = async () => {
    try {
      for (const prof of professions) {
        await httpService.put(`profession/${prof._id}`, prof);
        incrementCount();
      }
      for (const qual of qualities) {
        await httpService.put(`quality/${qual._id}`, qual);
        incrementCount();
      }
      for (const user of users) {
        await httpService.put(`user/${user._id}`, user);
        incrementCount();
      }
    } catch (error) {
      setError(error);
      setStatus(statusConsts.error);
    }
  };

  return {
    error,
    initialize,
    status,
    progress,
  };
};

export default useMockData;
