import { Response } from '../types/Response';
import { PetCreationData } from '../types/PetCreationData';
import { Pet } from '../types/Pet';
import { sendRequest } from '../utils/sendRequest';

export const getAllPets = async (): Promise<Response> =>
  sendRequest('get', '/api/pets/my/all');

export const getPetTypes = async (): Promise<Response> =>
  sendRequest('get', '/api/pet-types');

export const createPet = async (data: PetCreationData): Promise<Response> =>
  sendRequest('post', '/api/pets', data);

export const getPetsByUserId = (id: number): Promise<Response> =>
  sendRequest('get', `/api/users/${id}/pets`);

export const updatePet = async (pet: Pet): Promise<Response> =>
  sendRequest('patch', `/api/pets/${pet.id}`, pet);

export const getPetById = async (id: number): Promise<Response> =>
  sendRequest('get', `/api/pets/${id}`);
