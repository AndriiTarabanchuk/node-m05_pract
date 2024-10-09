import Joi from 'joi';
import { ROLES } from '../constants/index.js';

export const registerUserValidSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  avatarUrl: Joi.string(),
  role: {
    type: String,
    enum: [ROLES.TEACHER, ROLES.PARENT],
    default: ROLES.PARENT,
  },
});

export const loginUserValidSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
