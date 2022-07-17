import axios from 'axios';
import { URL_BASE } from './constants';
import { Response } from '../types/Response';

export const tryLogin = async (
  login: string,
  password: string,
): Promise<Response> => {
  try {
    const response = await axios.post(`${URL_BASE}/api/auth/login`, {
      login,
      password,
    });

    return { status: response.status, data: response.data, ok: true };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { status: err.response!.status, ok: false };
    } else {
      throw err;
    }
  }
};
