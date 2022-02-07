import { toast } from 'react-toastify';
import axios from 'axios';
import configFile from '../config.json';

const http = axios.create({
  baseURL: configFile.apiEndpoint,
});

http.interceptors.request.use((config) => {
  if (configFile.isFirebase) {
    const containSlash = /\/$/gi.test(config.url);
    config.url = `${containSlash ? config.url.slice(0, -1) : config.url}.json`;
  }
  return config;
}, (error) => Promise.reject(error));

http.interceptors.response.use((res) => {
  if (configFile.isFirebase) {
    res.data = { content: res.data ? Object.values(res.data) : [] };
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
};

export default httpService;
