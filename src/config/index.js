require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_USERNAME: process.env.POSTGRES_USER,
  DB_PASSWORD: process.env.POSTGRES_PASSWORD,
  DATABASE: process.env.POSTGRES_DB,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DIALECT: 'postgres',
};
