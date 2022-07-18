import axios from 'axios';
import { URL_BASE } from './constants';
import { Response } from '../types/Response';
import { UserData } from '../types/UserData';

export const tryLogin = async (
  login: string,
  password: string,
): Promise<Response> => {
  try {
    const response = await axios.post(`${URL_BASE}/api/auth/login`, {
      login,
      password,
    });

    axios.defaults.headers.common['Authorization'] = response.data.accessToken;
    return { status: response.status, data: response.data.user, ok: true };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { status: err.response!.status, ok: false };
    } else {
      throw err;
    }
  }
};

export const register = async (data: UserData): Promise<Response> => {
  try {
    await axios.post(`${URL_BASE}/api/users`, data);
    const loginResponse = await tryLogin(data.login, data.password);
    return {
      status: loginResponse.status,
      data: loginResponse.data.user,
      ok: true,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response!.status,
        ok: false,
        data: err.response!.data,
      };
    } else {
      throw err;
    }
  }
};
