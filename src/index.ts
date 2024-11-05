import dotenv from 'dotenv';
dotenv.config();

import db from '../models';
import app from './app';

const port = process.env.PORT || 5001;

db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      /* eslint-disable no-console */
      console.log(`Listening: http://localhost:${port}`);
      /* eslint-enable no-console */
    });
  })
  .catch((error) => {
    /* eslint-disable no-console */
    console.error('Unable to connect to the database:', error);
    /* eslint-enable no-console */
    process.exit(1);
  });
