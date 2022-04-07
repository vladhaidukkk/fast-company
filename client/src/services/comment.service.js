import httpService from './http.service';
import configFile from '../config.json';

const commentEndpoint = 'comment/';

const commentService = {
  getById: async (id) => {
    const params = configFile.isFirebase
      ? {
          orderBy: '"pageId"',
          equalTo: `"${id}"`,
        }
      : {
          orderBy: 'pageId',
          equalTo: id,
        };
    const { data } = await httpService.get(commentEndpoint, {
      params,
    });

    return configFile.isFirebase ? data : { content: data };
  },
  create: async (payload) => {
    if (configFile.isFirebase) {
      const { data } = await httpService.put(commentEndpoint + payload._id, payload);
      return data;
    }
    const { data } = await httpService.post(commentEndpoint, payload);
    return { content: data };
  },
  delete: async (id) => {
    const { data } = await httpService.delete(commentEndpoint + id);
    return data;
  },
};

export default commentService;
