require('dotenv').config();

let config = {
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_DATABASE,
  "host": process.env.DB_HOST,
  "dialect": process.env.DB_DIALECT,
}

if (process.env.DEV_MODE === 'false') {
  config["logging"] = false;
}

module.exports = config;
