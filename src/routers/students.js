import { Router } from 'express';

import {
  createStudentController,
  deleteStudentByIdController,
  getStudentByIdController,
  getStudentsController,
  patchStudentController,
  putStudentController,
} from '../controllers/students.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createStudentValidationSchema } from '../validation/createStudentValidationSchema.js';
import { updateStudentValidationSchema } from '../validation/updateStudentValidationSchema.js';
import { isValidId } from '../validation/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const studentsRouter = Router();

studentsRouter.use('/:studentId', isValidId('studentId'));
// studentsRouter.use()
//   '/:studentId/diary/:diaryId',
//   validateMongoIdParam('diaryId'),
// );

studentsRouter.use(authenticate);

studentsRouter.get(
  '/',
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(getStudentsController),
);

studentsRouter.get(
  '/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  ctrlWrapper(getStudentByIdController),
);

studentsRouter.post(
  '/',
  checkRoles(ROLES.TEACHER),
  validateBody(createStudentValidationSchema),
  ctrlWrapper(createStudentController),
);

studentsRouter.patch(
  '/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  validateBody(updateStudentValidationSchema),
  ctrlWrapper(patchStudentController),
);

studentsRouter.put(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  validateBody(createStudentValidationSchema),
  ctrlWrapper(putStudentController),
);

studentsRouter.delete('/:studentId', ctrlWrapper(deleteStudentByIdController));

export default studentsRouter;
