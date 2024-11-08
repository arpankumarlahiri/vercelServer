// eslint-disable-next-line @typescript-eslint/no-unused-vars
import mysql2 from 'mysql2';

export default {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'database_development',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: process.env.DB_DIALECT || 'mysql',
  port: process.env.DB_PORT || '5000',
};
