import { Response } from '../types/Response';
import axios, { AxiosRequestConfig } from 'axios';
import { api } from '../services/authService';

export const sendRequest = async (
  type: 'post' | 'get' | 'patch' | 'delete',
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<Response> => {
  try {
    let response;
    switch (type) {
      case 'post':
        response = await api.post(url, data, config);
        break;
      case 'get':
        response = await api.get(url, config);
        break;
      case 'patch':
        response = await api.patch(url, data, config);
        break;
      case 'delete':
        response = await api.patch(url, config);
        break;
    }
    return { status: response.status, data: response.data, ok: true };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { status: err.response!.status, ok: false };
    } else {
      throw err;
    }
  }
};
