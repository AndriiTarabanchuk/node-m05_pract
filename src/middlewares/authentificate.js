import createHttpError from 'http-errors';

export const authentificate = async (req, res, next) => {
  const authHeader = req.get('authorization');
  if (!authHeader) {
    next(createHttpError(401, 'Auth header is required!')); //get valid authorization
  }
  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header must be type of Bearer!')); //get valid Bearer
  }
  const session = await Session.findOne({ accessToken: token });
  if (!session) {
    next(
      createHttpError(401, 'Auth token is not associated with any session!'),
    ); //get valid session
  }
  if (!session.accessTokenValidUntil < Date.now()) {
    return next(createHttpError(401, 'Auth token is expired!')); ///time
  }
  const user = await User.findId(session.userId);
  if (!user) {
    next(createHttpError(401, 'No user is associated with any session!')); //get valid session
  }
  next();
};
