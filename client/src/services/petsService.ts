import { api } from './authService';
import { Response } from '../types/Response';
import axios from 'axios';
import { PetCreationData } from '../types/PetCreationData';
import { Pet } from '../types/Pet';

export const getAllPets = async (): Promise<Response> => {
  try {
    const response = await api.get('/api/pets/my/all');
    return { status: response.status, data: response.data, ok: true };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { status: err.response!.status, ok: false };
    } else {
      throw err;
    }
  }
};

export const getPetTypes = async (): Promise<Response> => {
  try {
    const response = await api.get('/api/pet-types');
    return { status: response.status, data: response.data, ok: true };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { status: err.response!.status, ok: false };
    } else {
      throw err;
    }
  }
};

export const createPet = async (data: PetCreationData): Promise<Response> => {
  try {
    const response = await api.post('/api/pets', data);
    return { status: response.status, data: response.data, ok: true };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { status: err.response!.status, ok: false };
    } else {
      throw err;
    }
  }
};

export const getPetsByUserId = async (id: number): Promise<Response> => {
  try {
    const response = await api.get(`/api/users/${id}/pets`);
    return { status: response.status, data: response.data, ok: true };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { status: err.response!.status, ok: false };
    } else {
      throw err;
    }
  }
};

export const updatePet = async (pet: Pet): Promise<Response> => {
  try {
    const response = await api.patch(`/api/pets/${pet.id}`, pet);
    return { status: response.status, data: response.data, ok: true };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { status: err.response!.status, ok: false };
    } else {
      throw err;
    }
  }
};

export const getPetById = async (id: number): Promise<Response> => {
  try {
    const response = await api.get(`/api/pets/${id}`);
    return { status: response.status, data: response.data, ok: true };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { status: err.response!.status, ok: false };
    } else {
      throw err;
    }
  }
};
