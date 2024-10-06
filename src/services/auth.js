import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';
import { ACCESS_TOKEN_LIVE, REFRESH_TOKEN_LIVE } from '../constants/index.js';

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
  await SessionsCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_LIVE),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_LIVE),
  });
};

// export const logoutUser = async (req, res) => {};
