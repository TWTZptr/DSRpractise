import { api } from './authService';
import { Response } from '../types/Response';
import axios from 'axios';

export const getAllPets = async (): Promise<Response> => {
  try {
    const response = await api.get('api/pets/my/all');
    return { status: response.status, data: response.data, ok: true };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { status: err.response!.status, ok: false };
    } else {
      throw err;
    }
  }
};
