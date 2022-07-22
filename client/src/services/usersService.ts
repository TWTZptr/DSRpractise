import { Response } from '../types/Response';
import { api } from './authService';
import axios from 'axios';

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
