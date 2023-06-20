require("dotenv").config();
const Sequelize = require("sequelize");

const user = process.env.DB_USER;
const db = process.env.DB_NAME;
const pwd = process.env.DB_PASSWORD;

const dbConn = new Sequelize(db, user, pwd, {
  dialect: "mysql",
  host: "localhost",
});

module.exports = dbConn;
