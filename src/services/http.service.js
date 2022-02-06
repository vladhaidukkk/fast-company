import axios from 'axios';
import { toast } from 'react-toastify';
import configFile from '../config.json';

axios.defaults.baseURL = configFile.apiEndpoint;

axios.interceptors.request.use((config) => {
  if (configFile.isFirebase) {
    const containSlash = /\/$/gi.test(config.url);
    config.url = `${containSlash ? config.url.slice(0, -1) : config.url}.json`;
    console.log(config.url);
  }
  return config;
}, (error) => Promise.reject(error));

axios.interceptors.response.use((res) => {
  if (configFile.isFirebase) {
    res.data = { content: res.data ? Object.values(res.data) : [] };
    console.log(res.data);
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
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default httpService;
