import {
  ACCESS_TOKEN_LIVE_TIME,
  REFRESH_TOKEN_LIVE_TIME,
} from '../constants/index.js';
import {
  loginUserService,
  logoutUserService,
  refreshUsersSessionService,
  registerUserService,
} from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUserService(req.body);

  res.json({
    status: 201,
    message: `Successfully register a user!`,
    // data: serilizeUser(user), //adds-hash password
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUserService(req.body);

  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ACCESS_TOKEN_LIVE_TIME),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ACCESS_TOKEN_LIVE_TIME),
  });

  res.json({
    status: 200,
    message: `Successfully logged in an user!`,
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  await logoutUserService(req.cookies.sessionId, req.cookies.sessionToken);

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_LIVE_TIME),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_LIVE_TIME),
  };
};

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TOKEN_LIVE_TIME),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TOKEN_LIVE_TIME),
  });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSessionService({
    sessionId: req.cookies.sessionId,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
