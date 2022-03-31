import httpService from './http.service';

const commentEndpoint = 'comment/';

const commentService = {
  getById: async (id) => {
    const { data } = await httpService.get(commentEndpoint, {
      params: {
        orderBy: '"pageId"',
        equalTo: `"${id}"`,
      },
    });
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(commentEndpoint + payload._id, payload);
    return data;
  },
  delete: async (id) => {
    const { data } = await httpService.delete(commentEndpoint + id);
    return data;
  },
};

export default commentService;
