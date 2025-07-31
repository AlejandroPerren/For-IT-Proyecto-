import { Sequelize } from 'sequelize';

import { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT } from '../database/env'; 

const sequelize = new Sequelize(
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  {
    host: DB_HOST,
    port: Number(DB_PORT),
    dialect: DB_DIALECT as any,
    logging: false,
  }
);

export default sequelize;
