import createHttpError from 'http-errors';
import { ROLES } from '../constants/index.js';
import { StudentsCollection } from '../db/models/student.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const userRole = req.user?.role;
    if (!userRole) {
      return next();
    }
    if (roles.includes(ROLES.TEACHER) && userRole === ROLES.TEACHER) {
      return next();
    }

    if (roles.includes(ROLES.PARENT) && userRole === ROLES.PARENT) {
      const studentId = await StudentsCollection.findById(req.params.studentId);
      if (!studentId || req.user._id.equals(student.parentId)) {
        return next(
          createHttpError(403, 'User does not have access to such student!'),
        );
      }

      return next();
    }
    return next(createHttpError(403, 'Forbidden!'));
  };
