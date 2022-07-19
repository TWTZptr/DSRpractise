import axios from 'axios';
import { URL_BASE } from './constants';
import { Response } from '../types/Response';
import { UserRegistrationData } from '../types/UserRegistrationData';

export const tryLogin = async (
  login: string,
  password: string,
): Promise<Response> => {
  try {
    const response = await axios.post(`${URL_BASE}/api/auth/login`, {
      login,
      password,
    });

    setAccessToken(response.data.accessToken);
    return { status: response.status, data: response.data.user, ok: true };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { status: err.response!.status, ok: false };
    } else {
      throw err;
    }
  }
};

export const register = async (
  data: UserRegistrationData,
): Promise<Response> => {
  try {
    await axios.post(`${URL_BASE}/api/users`, data);
    const loginResponse = await tryLogin(data.login, data.password);
    return {
      status: loginResponse.status,
      data: loginResponse.data,
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

const setAccessToken = (token: string): void => {
  axios.defaults.headers.common['Authorization'] = token;
  localStorage.setItem('access_token', token);
};

export const initAuth = (): boolean => {
  const token = localStorage.getItem('access_token');
  if (token) {
    setAccessToken(token);
    return true;
  }
  return false;
};
