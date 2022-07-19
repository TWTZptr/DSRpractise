import axios from 'axios';
import { URL_BASE } from './constants';
import { Response } from '../types/Response';
import { UserRegistrationData } from '../types/UserRegistrationData';

const authApi = axios.create({
  baseURL: URL_BASE,
});

export const tryLogin = async (
  login: string,
  password: string,
): Promise<Response> => {
  try {
    const response = await authApi.post(`/api/auth/login`, {
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
    await authApi.post(`/api/users`, data);
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

export const tryRefresh = async (): Promise<boolean> => {
  try {
    const response = await authApi.post(`/api/auth/refresh`);
    if (response.data.accessToken) {
      setAccessToken(response.data.accessToken);
      console.log('got token by refresh');
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
};

const setAccessToken = (token: string): void => {
  authApi.defaults.headers.common['Authorization'] = token;
  localStorage.setItem('access_token', token);
};

export const initAuth = (): boolean => {
  const token = localStorage.getItem('access_token');
  if (token) {
    setAccessToken(token);
    console.log(`got token from localstorage ${token}`);
    return true;
  }
  return false;
};
