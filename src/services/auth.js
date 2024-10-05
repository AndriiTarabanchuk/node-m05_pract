import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/user.js';

const ACCESS_TOKEN_LIVE = 1000 * 60 * 15; //15
const refreshTokenValidUntil_TOKEN_LIVE = 1000 * 60 * 20; //15

export const registerUser = async (payload) => {
  // let user = await UsersCollection.findOne({ email: payload.email });
  // if (user) {
  //   throw createHttpError(409, 'user email this email already register');
  // }
  // const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await UsersCollection.create(payload);
  return user;
};

// export const loginUser = async (payload) => {
//   // let user = await User.findOne({ email: payload.email });
//   // if (user) {
//   //   throw createHttpError(409, 'user email this email already register');
//   // }
//   // const hashedPassword = await bcrypt.hash(payload.password, 10);
//   // user = await User.create(payload);

//   if (user) {
//     throw createHttpError(401, 'User not found');
//   }
//   // const arePasswordEquql = await bcrypt.

//   //   if (.password) {
//   //     throw createHttpError(401, 'User not found');
//   //   }

//   return user;
// };

// export const loginUser = async (req, res) => {};
// export const logoutUser = async (req, res) => {};
