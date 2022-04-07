import httpService from './http.service';
import configFile from '../config.json';

const professionEndpoint = 'profession/';

const professionService = {
  get: async () => {
    const { data } = await httpService.get(professionEndpoint);
    return configFile.isFirebase ? data : { content: data };
  },
};

export default professionService;
