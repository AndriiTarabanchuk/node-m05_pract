import Joi from 'joi';

export const createUserValidationSchema = Joi.object({
  name: Joi.string().required().min(2).max(20),
  email: Joi.number().required().email(),
  password: Joi.string().required().min(6).max(12),
});
