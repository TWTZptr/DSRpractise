import Joi from 'joi';
import {
  DOCTOR_EDUCATION_MAX_LENGTH,
  DOCTOR_EDUCATION_MIN_LENGTH,
  DOCTOR_NAME_MAX_LENGTH,
  DOCTOR_NAME_MIN_LENGTH,
  DOCTOR_PHONE_MAX_LENGTH,
  DOCTOR_PHONE_MIN_LENGTH,
} from './constants';
import {
  MAX_LOGIN_LENGTH,
  MIN_LOGIN_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../Registrationpage/constants';
import { Doctor } from '../../types/Doctor';
import { DoctorCreationData } from '../../types/DoctorCreationData';

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
  login: Joi.string().min(MIN_LOGIN_LENGTH).max(MAX_LOGIN_LENGTH).messages({
    'string.empty': 'Логин не должен быть пустым',
    'string.min': 'Логин должен быть длиннее {#limit} символов',
    'string.max': 'Логин должен быть короче {#limit} символов',
  }),
  password: Joi.string().min(MIN_PASSWORD_LENGTH).messages({
    'string.empty': 'Пароль не должен быть пустым',
    'string.min': 'Пароль должен быть длиннее {#limit} символов',
  }),
}).unknown(true);

export const validateDoctor = (
  data: Doctor | DoctorCreationData,
): string | null => {
  const validationResult = schema.validate(data);
  if (validationResult.error) {
    return validationResult.error.message;
  } else {
    return null;
  }
};
