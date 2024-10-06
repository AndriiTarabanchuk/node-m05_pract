import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginController,
  registerController,
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
  ctrlWrapper(registerController),
);
authRouter.post(
  '/login',
  validateBody(loginUserValidSchema),
  ctrlWrapper(loginController),
);
// authRouter.post('/login');
// authRouter.post('/logout', ctrlWrapper(loguotUserController));
// authRouter.post('/refresh-session');

export default authRouter;
