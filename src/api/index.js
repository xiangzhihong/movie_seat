import axios from 'axios';
import qs from 'querystring';
import baseConfig from './httpConfig';

const headers = {
  'User-Agent': 'BIZSTREAM Library',
  'Content-Type': 'application/json',
};

axios.defaults.baseURL = baseConfig.baseUrl;
axios.defaults.headers = headers;
axios.defaults.timeout = 30000;

axios.interceptors.request.use(config => {
  // config.headers.Authorization = baseConfig.authentication;
  if (config.method === 'get') {
    config.params = {
      ...config.data,
      _t: Date.parse(new Date()) / 1000,
    };
  }
  return config;
});

axios.interceptors.response.use(response => {
  if (response.status === '200' || response.status === 200) {
    return response.data.data || response.data;
  } else {
    throw Error(response.opt || '服务异常');
  }
});

export default class apiRequest {
  static async get(url, params) {
    try {
      let query = await qs.stringify(params);
      let res = null;
      if (!params) {
        res = await axios.get(url);
      } else {
        res = await axios.get(url + '?' + query);
      }
      return res;
    } catch (error) {
      return error;
    }
  }

  static async post(url, params) {
    try {
      return await axios.post(url, params);
    } catch (error) {
      return error;
    }
  }

  static async patch(url, params) {
    try {
      return await axios.patch(url, params);
    } catch (error) {
      return error;
    }
  }

  static async put(url, params) {
    try {
      return await axios.put(url, params);
    } catch (error) {
      return error;
    }
  }

  static async delete(url, params) {
    try {
      return await axios.post(url, params);
    } catch (error) {
      return error;
    }
  }
}
