import httpService from './http.service';
import localStorageService from './localStorage.service';
import configFile from '../config.json';

const userEndpoint = 'user/';

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint);
    return configFile.isFirebase ? data : { content: data };
  },
  create: async (payload) => {
    const { data } = await httpService.put(userEndpoint + payload._id, payload);
    return data;
  },
  getCurrentUser: async () => {
    const userId = localStorageService.getUserId();
    const { data } = await httpService.get(userEndpoint + userId);
    return configFile.isFirebase ? data : { content: data };
  },
  patch: async (id, payload) => {
    const { data } = await httpService.patch(userEndpoint + id, payload);
    return configFile.isFirebase ? data : { content: data };
  },
};

export default userService;
