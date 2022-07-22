import { Response } from '../types/Response';
import { api } from './authService';
import axios from 'axios';
import { User } from '../types/User';

export const getAllUsers = async (): Promise<Response> => {
  try {
    const response = await api.get('/api/users');
    return { status: response.status, data: response.data, ok: true };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { status: err.response!.status, ok: false };
    } else {
      throw err;
    }
  }
};

export const getUserInfo = async (id: number): Promise<Response> => {
  try {
    const response = await api.get(`api/users/${id}/all`);
    return { status: response.status, data: response.data, ok: true };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { status: err.response!.status, ok: false };
    } else {
      throw err;
    }
  }
};

export const updateUser = async (user: User): Promise<Response> => {
  try {
    const response = await api.patch(`api/users/${user.id}`, user);
    return { status: response.status, data: response.data, ok: true };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { status: err.response!.status, ok: false };
    } else {
      throw err;
    }
  }
};
