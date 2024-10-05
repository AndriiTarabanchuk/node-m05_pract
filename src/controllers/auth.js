import { registerUser } from '../services/auth.js';

export const registerController = async (req, res) => {
  const user = await registerUser(req.body);

  res.json({
    status: 201,
    message: `Successfully register a user!`,
    // data: serilizeUser(user), //adds-hash password
    data: user,
  });
};

// export const loginUserController = async (req, res) => {
//   const { body } = req;
//   const user = await loginUser(body);

//   res.json({
//     status: 200,
//     message: `Successfully LOGGED user!`,
//     data: { user },
//   });
// };

// export const loguotUserController = () => {};
