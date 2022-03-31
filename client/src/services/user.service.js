import httpService from './http.service';
import localStorageService from './localStorage.service';

const userEndpoint = 'user/';

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(userEndpoint + payload._id, payload);
    return data;
  },
  getCurrentUser: async () => {
    const userId = localStorageService.getUserId();
    const { data } = await httpService.get(userEndpoint + userId);
    return data;
  },
  patch: async (id, payload) => {
    const { data } = await httpService.patch(userEndpoint + id, payload);
    return data;
  },
};

export default userService;
