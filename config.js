require("dotenv").config();

module.exports = {
  SECRET_KEY: process.env.SECRET_KEY,
  DB_HOST: process.env.DB_HOST,
  PORT: process.env.PORT,
};