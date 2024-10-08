import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  const { body } = req;
  try {
    await schema.validateAsync(body, {
      convert: false,
      abortEarly: false,
    });

    next();
  } catch (err) {
    const error = createHttpError(400, 'Bad Request', {
      errors: err,
    });
    next(error);
  }
};
