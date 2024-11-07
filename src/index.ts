import dotenv from 'dotenv';
dotenv.config();

import db from '../models';
import app from './app';
import './types';
import mongoConnect from './Mongoose/Init';

const port = process.env.PORT || 5001;

mongoConnect()
  .then(() => {
    db.sequelize
      // .sync({ alter: true })
      .sync()
      .then(() => {
        app.listen(port, () => {
          console.log(`Listening: http://localhost:${port}`);
        });
      })
      .catch((error) => {
        /* eslint-disable no-console */
        console.error('Unable to connect to the database:', error);
        /* eslint-enable no-console */
        process.exit(1);
      });
  })
  .catch(console.log);
