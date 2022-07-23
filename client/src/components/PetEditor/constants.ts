import { PetCreationData } from '../../types/PetCreationData';

export const MAX_PET_NAME_LENGTH = 40;
export const MAX_PET_INFO_LENGTH = 100;
export const MAX_BREED_LENGTH = 40;
export const MIN_BREED_LENGTH = 3;
export const MIN_PET_INFO_LENGTH = 0;
export const MIN_PET_NAME_LENGTH = 2;
export const INIT_PET: PetCreationData = {
  breed: '',
  name: '',
  info: '',
  photo: '',
  typeId: '',
};
export const ERROR_MESSAGE_SHOW_TIME = 3000;