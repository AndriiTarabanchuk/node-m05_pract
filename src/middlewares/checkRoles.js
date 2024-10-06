// import createHttpError from 'http-errors';

// export const checkRoles =
//   (...roles) =>
//   async (res, req, next) => {
//     const userRole = req.user.role;
//     if (userRole === 'teacher' && roles.includes('teacher')) {
//       return next();
//     }
//     if (userRole === 'parent' && roles.includes('parent')) {
//       const student = await Student.findOne({
//         _id: req.params.studentId,
//         parentId: req.user._id,
//       });
//       // const student = await Student.findOne({req.params.studentId})
//       if (!student) {
//         return next(
//           createHttpError(403, 'User dont hve access to such student!'),
//         );
//       }
//       return next();
//     }
//     return next(createHttpError(403, 'Forbidden'));
//   };
