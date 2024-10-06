import { ONE_DAY } from '../constants/index.js';
import { loginUserService, registerUserService } from '../services/auth.js';

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

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: `Successfully logged in an user!`,
    data: {
      accessToken: session.accessToken,
    },
  });
};

// export const loguotUserController = () => {};
