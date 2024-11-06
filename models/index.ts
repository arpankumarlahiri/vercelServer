'use strict';

import * as fs from 'fs';
import * as path from 'path';
import { Sequelize, DataTypes, Dialect } from 'sequelize';
import config from '../config/config';

const basename = path.basename(__filename);

let sequelize: Sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect as Dialect,
  dialectModule: require('mysql2'),
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false,
  //   },
  // },
  port: parseInt(config.port as string, 10),
});

interface DbInterface {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  [key: string]: any;
}

const db: DbInterface = {
  sequelize,
  Sequelize,
};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      (file.slice(-3) === '.js' || file.slice(-3) === '.ts') &&
      file.indexOf('.test.') === -1
    );
  })
  .forEach((file) => {
    const modelModule = require(path.join(__dirname, file));
    if (typeof modelModule?.default === 'function') {
      const model = modelModule.default(sequelize, DataTypes);
      db[model.name] = model;
    }
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
