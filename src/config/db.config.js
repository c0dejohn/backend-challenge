const env = require('./index');
module.exports = {
  development: {
    HOST: env.DB_HOST,
    USER: env.DB_USERNAME,
    PASSWORD: env.DB_PASSWORD,
    DB: env.DATABASE,
    dialect: env.DIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  test: {
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: env.DIALECT,
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DATABASE,
    host: env.DB_HOST,
    dialect: env.DIALECT,
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
