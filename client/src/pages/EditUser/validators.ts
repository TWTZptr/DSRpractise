import Joi from 'joi';
import { User } from '../../types/User';
import {
  MAX_EMAIL_LENGTH,
  MAX_LOGIN_LENGTH,
  MAX_USER_PHONE_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_LOGIN_LENGTH,
  MIN_USER_PHONE_LENGTH,
  MIN_USERNAME_LENGTH,
} from '../Registrationpage/constants';

const schema = Joi.object({
  login: Joi.string().min(MIN_LOGIN_LENGTH).max(MAX_LOGIN_LENGTH).messages({
    'string.empty': 'Логин не должен быть пустым',
    'string.min': 'Логин должен быть длиннее {#limit} символов',
    'string.max': 'Логин должен быть короче {#limit} символов',
  }),
  email: Joi.string()
    .max(MAX_EMAIL_LENGTH)
    .email({ tlds: { allow: false } })
    .messages({
      'string.empty': 'Email не должен быть пустым',
      'string.email': 'Email не соответствует формату',
      'string.max': 'Email должен быть короче {#limit} символов',
    }),
  name: Joi.string()
    .max(MAX_USERNAME_LENGTH)
    .min(MIN_USERNAME_LENGTH)
    .required()
    .messages({
      'string.empty': 'Имя не должно быть пустым',
      'string.min': 'Имя должно быть длиннее {#limit} символов',
      'string.max': 'Имя должно быть короче {#limit} символов',
    }),
  phone: Joi.string()
    .min(MIN_USER_PHONE_LENGTH)
    .max(MAX_USER_PHONE_LENGTH)
    .required()
    .messages({
      'string.empty': 'Номер телефона не должен быть пустым',
      'string.min': 'Номер телефона должен быть длиннее {#limit} символов',
      'string.max': 'Номер телефона должен быть короче {#limit} символов',
    }),
}).unknown(true);

export const validateUser = (data: User): string | null => {
  const validationResult = schema.validate(data);
  if (validationResult.error) {
    return validationResult.error.message;
  } else {
    return null;
  }
};
