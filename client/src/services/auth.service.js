import axios from 'axios';
import configFile from '../config.json';

const httpAuth = axios.create({
  baseURL: configFile.isFirebase
    ? 'https://identitytoolkit.googleapis.com/v1/'
    : `${configFile.apiEndpoint}auth/`,
  params: {
    key: configFile.isFirebase ? process.env.REACT_APP_FIREBASE_KEY : undefined,
  },
});

const authService = {
  register: async (payload) => {
    const endpoint = configFile.isFirebase ? 'accounts:signUp' : 'signUp';
    const body = configFile.isFirebase
      ? {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }
      : payload;
    const { data } = await httpAuth.post(endpoint, body);

    return data;
  },
  login: async ({ email, password }) => {
    const endpoint = configFile.isFirebase ? 'accounts:signInWithPassword' : 'signInWithPassword';
    const body = configFile.isFirebase
      ? {
          email,
          password,
          returnSecureToken: true,
        }
      : {
          email,
          password,
        };
    const { data } = await httpAuth.post(endpoint, body);

    return data;
  },
  exchangeToken: async ({ refreshToken }) => {
    if (configFile.isFirebase) {
      const key = process.env.REACT_APP_FIREBASE_KEY;
      const { data } = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${key}`, {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      });
      return data;
    }
    const { data } = await httpAuth.post('token', {
      refresh_token: refreshToken,
    });
    return data;
  },
};

export default authService;
