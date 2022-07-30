import { sendRequest } from '../utils/sendRequest';
import { Response } from '../types/Response';
import { Doctor } from '../types/Doctor';
import { DoctorCreationData } from '../types/DoctorCreationData';

export const getAllDoctors = async (): Promise<Response> => {
  const response = await sendRequest('get', '/api/doctors');
  if (response.ok) {
    if (response.data[0] && response.data[0].user) {
      response.data = response.data.map((doctor: Doctor) => {
        doctor.login = doctor.user!.login;
        return doctor;
      });
    }
  }
  return response;
};

export const getDoctorById = async (id: number): Promise<Response> => {
  const response = await sendRequest('get', `/api/doctors/${id}`);
  if (response.ok) {
    response.data.login = response.data.user.login;
  }
  return response;
};

export const createDoctor = (data: DoctorCreationData): Promise<Response> =>
  sendRequest('post', '/api/doctors', data);

export const updateDoctor = ({ user, ...data }: Doctor): Promise<Response> => {
  return sendRequest('patch', `/api/doctors/${data.id}`, data);
};

export const deleteDoctor = (id: number): Promise<Response> =>
  sendRequest('delete', `/api/doctors/${id}`);

export const getVisitsByDoctor = (id: number): Promise<Response> =>
  sendRequest('get', `/api/doctors/${id}/visits`);
