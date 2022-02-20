import { toast } from 'react-toastify';
import axios from 'axios';
import configFile from '../config.json';
import localStorageService from './localStorage.service';

const http = axios.create({
  baseURL: configFile.apiEndpoint,
});

http.interceptors.request.use(async (config) => {
  if (configFile.isFirebase) {
    const containSlash = /\/$/gi.test(config.url);
    config.url = `${containSlash ? config.url.slice(0, -1) : config.url}.json`;

    const refreshToken = localStorageService.getRefreshToken();
    const expiresIn = localStorageService.getTokenExpiresDate();

    if (refreshToken && expiresIn < Date.now()) {
      const key = process.env.REACT_APP_FIREBASE_KEY;
      const { data } = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${key}`, {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      });
      localStorageService.setTokens({
        idToken: data.id_token,
        refreshToken: data.refresh_token,
        localId: data.user_id,
        expiresIn: data.expires_in,
      });
    }

    const accessToken = localStorageService.getAccessToken();
    if (accessToken) {
      config.params = { ...config.params, auth: accessToken };
    }
  }
  return config;
}, (error) => Promise.reject(error));

http.interceptors.response.use((res) => {
  if (configFile.isFirebase) {
    res.data = { content: res.data && !res.data._id ? Object.values(res.data) : res.data };
  }
  return res;
}, (error) => {
  const isExpected = error.response
    && error.response.status >= 400
    && error.response.status < 500;

  if (!isExpected) {
    toast('Something went wrong. Try later');
  }

  return Promise.reject(error);
});

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;
