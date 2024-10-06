import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  registerUserController,
  // loguotUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUserValidSchema,
  registerUserValidSchema,
} from '../validation/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserValidSchema),
  ctrlWrapper(registerUserController),
);
authRouter.post(
  '/login',
  validateBody(loginUserValidSchema),
  ctrlWrapper(loginUserController),
);
// authRouter.post('/login');
// authRouter.post('/logout', ctrlWrapper(loguotUserController));
// authRouter.post('/refresh-session');

export default authRouter;
