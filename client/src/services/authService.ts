import axios from 'axios';
import { URL_BASE } from './constants';
import { Response } from '../types/Response';
import { UserRegistrationData } from '../types/UserRegistrationData';

export const api = axios.create({
  baseURL: URL_BASE,
});

export const tryLogin = async (
  login: string,
  password: string,
): Promise<Response> => {
  try {
    const response = await api.post(`/api/auth/login`, {
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
    await api.post(`/api/users`, data);
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
    const response = await api.post(`/api/auth/refresh`);
    if (response.data.accessToken) {
      setAccessToken(response.data.accessToken);
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
};

const setAccessToken = (token: string): void => {
  api.defaults.headers.common['Authorization'] = token;
  localStorage.setItem('access_token', token);
};

export const getAccessTokenFromStorage = (): boolean => {
  const token = localStorage.getItem('access_token');
  if (token) {
    setAccessToken(token);
    return true;
  }
  return false;
};

export const removeAccessTokenFromStorage = (): void => {
  localStorage.removeItem('access_token');
};

export const getSelf = async (): Promise<Response> => {
  try {
    const response = await api.get(`/api/auth/me`);
    return { status: response.status, data: response.data, ok: true };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { status: err.response!.status, ok: false };
    } else {
      throw err;
    }
  }
};

export const tryLogout = async (): Promise<Response> => {
  try {
    const response = await api.post('/api/auth/logout');
    return { status: response.status, ok: true };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { status: err.response!.status, ok: false };
    } else {
      throw err;
    }
  }
};
