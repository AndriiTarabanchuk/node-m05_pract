import { loginUserService, registerUserService } from '../services/auth.js';

export const registerController = async (req, res) => {
  const user = await registerUserService(req.body);

  res.json({
    status: 201,
    message: `Successfully register a user!`,
    // data: serilizeUser(user), //adds-hash password
    data: user,
  });
};

export const loginController = async (req, res) => {
  const user = await loginUserService(req.body);

  res.json({
    status: 200,
    message: `Successfully LOGGED a user!`,
    data: user,
  });
};

// export const loguotUserController = () => {};
