import axios from 'axios';
import { Response } from '../types/Response';
import { api } from './authService';
import { VisitCreationData } from '../types/VisitCreationData';

export const getAllVisits = async (): Promise<Response> => {
  try {
    const response = await api.get('/api/visits');
    return { status: response.status, data: response.data, ok: true };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { status: err.response!.status, ok: false };
    } else {
      throw err;
    }
  }
};

export const createVisit = async (visit: VisitCreationData) => {
  try {
    const response = await api.post('/api/visits', visit);
    return { status: response.status, data: response.data, ok: true };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { status: err.response!.status, ok: false };
    } else {
      throw err;
    }
  }
};
