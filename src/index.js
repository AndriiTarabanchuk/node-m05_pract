import { initMongoConnection } from './db/initMongoConnection.js';
import { startServer } from './server.js';

const start = async () => {
  await initMongoConnection();
  startServer();
};

start();
