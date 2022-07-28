import { Response } from '../types/Response';
import { VisitCreationData } from '../types/VisitCreationData';
import { sendRequest } from '../utils/sendRequest';

export const createVisit = async (visit: VisitCreationData) =>
  sendRequest('post', '/api/visits', visit);

export const deleteVisit = async (id: number): Promise<Response> =>
  sendRequest('delete', `/api/visits/${id}`);
