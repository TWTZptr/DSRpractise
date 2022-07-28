import axios from 'axios';
import { URL_BASE } from './constants';
import { Response } from '../types/Response';
import { UserRegistrationData } from '../types/UserRegistrationData';
import { sendRequest } from '../utils/sendRequest';

export const api = axios.create({
  baseURL: URL_BASE,
});

export const tryLogin = async (
  login: string,
  password: string,
): Promise<Response> => {
  const response = await sendRequest(
    'post',
    `/api/auth/login`,
    {
      login,
      password,
    },
    { withCredentials: true },
  );
  setAccessToken(response.data.accessToken);
  return response;
};

export const tryRegister = async (
  data: UserRegistrationData,
): Promise<Response> => {
  await sendRequest('post', '/api/users', data);
  return tryLogin(data.login, data.password);
};

export const tryRefresh = async (): Promise<boolean> => {
  try {
    const response = await sendRequest('post', `/api/auth/refresh`, null, {
      withCredentials: true,
    });
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

export const getSelf = async (): Promise<Response> =>
  sendRequest('get', `/api/auth/me`);

export const tryLogout = async (): Promise<Response> =>
  sendRequest('post', '/api/auth/logout', null, {
    withCredentials: true,
  });
