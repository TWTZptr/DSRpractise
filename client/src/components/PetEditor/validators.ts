import Joi from 'joi';
import { PetCreationData } from '../../types/PetCreationData';
import {
  MAX_BREED_LENGTH,
  MAX_PET_INFO_LENGTH,
  MAX_PET_NAME_LENGTH,
  MIN_BREED_LENGTH,
  MIN_PET_NAME_LENGTH,
} from './constants';

const schema = Joi.object({
  breed: Joi.string()
    .required()
    .min(MIN_BREED_LENGTH)
    .max(MAX_BREED_LENGTH)
    .messages({
      'string.empty': 'Порода не указана',
      'string.min': 'Порода должна быть длиннее {#limit} символов',
      'string.max': 'Порода должна быть короче {#limit} символов',
    }),
  name: Joi.string()
    .required()
    .min(MIN_PET_NAME_LENGTH)
    .max(MAX_PET_NAME_LENGTH)
    .messages({
      'string.empty': 'Имя не указано',
      'string.min': 'Имя должно быть длиннее {#limit} символов',
      'string.max': 'Имя должно быть короче {#limit} символов',
    }),
  info: Joi.string()
    .max(MAX_PET_INFO_LENGTH)
    .messages({
      'string.max': 'Доп. информация должна быть короче {#limit} символов',
    })
    .allow(''),
}).unknown(true);

export const validatePet = (data: PetCreationData): string | null => {
  const validationResult = schema.validate(data);
  if (validationResult.error) {
    return validationResult.error.message;
  } else {
    return null;
  }
};
