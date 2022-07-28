import Joi from 'joi';
import {
  DOCTOR_EDUCATION_MAX_LENGTH,
  DOCTOR_EDUCATION_MIN_LENGTH,
  DOCTOR_NAME_MAX_LENGTH,
  DOCTOR_NAME_MIN_LENGTH,
  DOCTOR_PHONE_MAX_LENGTH,
  DOCTOR_PHONE_MIN_LENGTH,
} from './constants';
import { Doctor } from '../../types/Doctor';

const schema = Joi.object({
  name: Joi.string()
    .min(DOCTOR_NAME_MIN_LENGTH)
    .max(DOCTOR_NAME_MAX_LENGTH)
    .messages({
      'string.empty': 'ФИО не должно быть пустым',
      'string.min': 'ФИО должно быть длиннее {#limit} символов',
      'string.max': 'ФИО должно быть короче {#limit} символов',
    }),
  phone: Joi.string()
    .min(DOCTOR_PHONE_MIN_LENGTH)
    .max(DOCTOR_PHONE_MAX_LENGTH)
    .messages({
      'string.empty': 'Номер телефона не должен быть пустым',
      'string.min': 'Номер телефона должен быть длиннее {#limit} символов',
      'string.max': 'Номер телефона должен быть короче {#limit} символов',
    }),
  education: Joi.string()
    .min(DOCTOR_EDUCATION_MIN_LENGTH)
    .max(DOCTOR_EDUCATION_MAX_LENGTH)
    .messages({
      'string.empty': 'Образование не должно быть пустым',
      'string.min': 'Образование должно быть длиннее {#limit} символов',
      'string.max': 'Образование должно быть короче {#limit} символов',
    }),
  experience: Joi.string().optional(),
  achievements: Joi.string().optional(),
  serviceTypes: Joi.string().optional(),
  id: Joi.number().optional(),
});

export const validateDoctor = (data: Doctor): string | null => {
  const validationResult = schema.validate(data);
  if (validationResult.error) {
    return validationResult.error.message;
  } else {
    return null;
  }
};
