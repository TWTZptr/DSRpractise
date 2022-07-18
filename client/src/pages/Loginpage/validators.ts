import Joi from 'joi';
import { LoginData } from '../../types/LoginData';

const schema = Joi.object({
  login: Joi.string().required().messages({
    'string.empty': 'Логин не должен быть пустым',
    'any.required': 'Логин не должен быть пустым',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Пароль не должен быть пустым',
    'any.required': 'Пароль должен быть не пустым',
  }),
});

export const validateCredentials = (data: LoginData): string | null => {
  const validationResult = schema.validate(data);
  if (validationResult.error) {
    return validationResult.error.message;
  } else {
    return null;
  }
};
