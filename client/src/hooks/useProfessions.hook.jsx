import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import professionService from '../services/profession.service';

const ProfessionsContext = React.createContext();

export const useProfessions = () => useContext(ProfessionsContext);

export const ProfessionsProvider = ({ children }) => {
  const [professions, setProfessions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const catchError = (error) => {
    const message = error.response?.data.message;
    if (message) setError(message);
  };

  useEffect(() => {
    const getProfessions = async () => {
      try {
        const { content } = await professionService.get();
        setProfessions(content);
        setLoading(false);
      } catch (error) {
        catchError(error);
      }
    };
    getProfessions();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const getProfession = (id) => professions.find((profession) => profession._id === id);

  return (
    <ProfessionsContext.Provider value={{ isLoading, professions, getProfession }}>
      {children}
    </ProfessionsContext.Provider>
  );
};

ProfessionsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
