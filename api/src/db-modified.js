import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );
const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
   
  }
);
export default sequelize;