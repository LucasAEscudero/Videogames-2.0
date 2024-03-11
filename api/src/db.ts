import { Sequelize } from "sequelize-typescript";
const { DB_PASSWORD } = process.env;

let sequelize = new Sequelize({
  dialect: "postgres",
  username: "postgres",
  password: DB_PASSWORD,
  database: "videogames",
  logging: false,
  native: false,
  models: [__dirname + "/models"],
});

export default sequelize;
