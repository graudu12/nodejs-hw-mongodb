import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
export const reqResetPassSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPassSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});
