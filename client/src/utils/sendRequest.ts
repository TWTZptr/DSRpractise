import { Response } from '../types/Response';
import axios, { AxiosRequestConfig } from 'axios';
import { api, tryRefresh } from '../services/authService';

const sendApiRequest = (
  type: 'post' | 'get' | 'patch' | 'delete',
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<Response> => {
  switch (type) {
    case 'post':
      return api.post(url, data, config);
    case 'get':
      return api.get(url, config);
    case 'patch':
      return api.patch(url, data, config);
    case 'delete':
      return api.delete(url, config);
  }
};

export const sendRequest = async (
  type: 'post' | 'get' | 'patch' | 'delete',
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<Response> => {
  try {
    const response = await sendApiRequest(type, url, data, config);

    return { status: response.status, data: response.data, ok: true };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401 && (await tryRefresh())) {
        const response = await sendApiRequest(type, url, data, config);
        return { status: response.status, data: response.data, ok: true };
      }

      return {
        status: err.response!.status,
        ok: false,
      };
    } else {
      throw err;
    }
  }
};
