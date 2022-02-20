import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useAuth } from './useAuth.hook';
import commentService from '../services/comment.service';

const CommentsContext = React.createContext();

const useComments = () => useContext(CommentsContext);

const CommentsProvider = ({ children }) => {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const catchError = (error) => {
    const message = error.response?.data.message;
    if (message) setError(message);
  };

  useEffect(() => {
    const getUserComments = async () => {
      try {
        const { content } = await commentService.getById(userId);
        setComments(content);
      } catch (error) {
        catchError(error);
      } finally {
        setLoading(false);
      }
    };
    getUserComments();
  }, [userId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const createComment = async (data) => {
    try {
      const comment = {
        ...data,
        _id: nanoid(),
        userId: currentUser._id,
        createdAt: Date.now(),
      };
      const { content } = await commentService.create(comment);
      setComments((prev) => [...prev, content]);
    } catch (error) {
      catchError(error);
    }
  };

  const deleteComment = async (id) => {
    try {
      await commentService.delete(id);
      setComments((prev) => prev.filter((comment) => comment._id !== id));
    } catch (error) {
      catchError(error);
    }
  };

  return (
    <CommentsContext.Provider value={{
      isLoading, comments, createComment, deleteComment,
    }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default useComments;
export { CommentsProvider };
