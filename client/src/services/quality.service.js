import httpService from './http.service';
import configFile from '../config.json';

const qualityEndpoint = 'quality/';

const qualityService = {
  get: async () => {
    const { data } = await httpService.get(qualityEndpoint);
    return configFile.isFirebase ? data : { content: data };
  },
};

export default qualityService;
