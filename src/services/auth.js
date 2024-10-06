import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/user.js';

// const ACCESS_TOKEN_LIVE = 1000 * 60 * 15; //15
// const refreshTokenValidUntil_TOKEN_LIVE = 1000 * 60 * 20; //15

export const registerUserService = async (payload) => {
  let user = await UsersCollection.findOne({ email: payload.email }); // check unic email in base
  if (user) {
    throw createHttpError(409, 'This user email already register!');
  }
  const encryptedPassword = await bcrypt.hash(payload.password, 10); //adds-hesh-pass

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUserService = async (payload) => {
  let user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found!');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }
};

// export const loginUser = async (req, res) => {};
// export const logoutUser = async (req, res) => {};
