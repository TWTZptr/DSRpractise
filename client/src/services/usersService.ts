import { Response } from '../types/Response';
import { User } from '../types/User';
import { sendRequest } from '../utils/sendRequest';

export const getAllUsers = async (): Promise<Response> =>
  sendRequest('get', '/api/users');

export const getUserInfo = async (id: number): Promise<Response> =>
  sendRequest('get', `api/users/${id}/all`);

export const updateUser = async (user: User): Promise<Response> =>
  sendRequest('patch', `api/users/${user.id}`, user);

export const setBanUser = async (
  userId: number,
  ban: boolean,
): Promise<Response> =>
  sendRequest('post', `/api/users/${userId}/${ban ? 'ban' : 'unban'}`);

export const getUserById = async (id: number): Promise<Response> =>
  sendRequest('get', `/api/users/${id}`);
