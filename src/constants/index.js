export const ENV_VARS = {
  PORT: 'PORT',
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
};

export const ACCESS_TOKEN_LIVE_TIME = 1000 * 60 * 15; //15 min
export const REFRESH_TOKEN_LIVE_TIME = 1000 * 60 * 60 * 24; //1 sec
// export const REFRESH_TOKEN_LIVE_TIME = 1000 * 60 * 60 * 24; //24 hour

export const ROLES = {
  TEACHER: 'teacher',
  PARENT: 'parent',
};
