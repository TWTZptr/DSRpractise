import { sendRequest } from '../utils/sendRequest';
import { Response } from '../types/Response';
import { Doctor } from '../types/Doctor';

export const getAllDoctors = (): Promise<Response> =>
  sendRequest('get', '/api/doctors');

export const getDoctorById = (id: number): Promise<Response> =>
  sendRequest('get', `/api/doctors/${id}`);

export const createDoctor = (data: Doctor): Promise<Response> =>
  sendRequest('post', '/api/doctors');
