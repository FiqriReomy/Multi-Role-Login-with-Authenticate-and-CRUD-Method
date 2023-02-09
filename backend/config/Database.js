import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const { DB_NAME, DB_HOST, DB_PASSWORD } = process.env;

export const database = new Sequelize(DB_NAME, DB_HOST, DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});
