// SPDX-License-Identifier: Apache-2.0
require('dotenv').config();
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_NAME);
console.log(process.env.DB_URL);

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_URL,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    define: {
      charset: 'utf8',
      underscored: true,
      underscore: true,
      underscoredAll: true,
    },
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
