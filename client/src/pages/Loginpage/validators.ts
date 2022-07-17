import Joi from 'joi';
import { ValidationResult } from '../../types/ValidationResult';

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

export const validateCredentials = (
  login: string,
  password: string,
): ValidationResult => {
  const validationResult = schema.validate({ login, password });
  if (validationResult.error) {
    return { ok: false, error: validationResult.error.message };
  } else {
    return { ok: true };
  }
};
