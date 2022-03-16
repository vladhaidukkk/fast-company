import axios from 'axios';

const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
    // key: 'AIzaSyDx2b-juTev7UOyt835ey7Jt3egvcDmUac',
  },
});

const authService = {
  register: async ({ email, password }) => {
    const { data } = await httpAuth.post('accounts:signUp', {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },
  login: async ({ email, password }) => {
    const { data } = await httpAuth.post('accounts:signInWithPassword', {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },
};

export default authService;
