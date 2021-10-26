const { NODE_ENV } = require('../config/index');
const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  dbConfig[NODE_ENV].DB,
  dbConfig[NODE_ENV].USER,
  dbConfig[NODE_ENV].PASSWORD,
  {
    host: dbConfig[NODE_ENV].HOST,
    dialect: dbConfig[NODE_ENV].dialect,
    operatorsAliases: false,
    logging: false,
    pool: {
      max: dbConfig[NODE_ENV].pool.max,
      min: dbConfig[NODE_ENV].pool.min,
      acquire: dbConfig[NODE_ENV].pool.acquire,
      idle: dbConfig[NODE_ENV].pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.character = require('./character.js')(sequelize, Sequelize);
db.film = require('./film.js')(sequelize, Sequelize);
db.user = require('./user.js')(sequelize, Sequelize);
db.filmgenre = require('./filmgenre.js')(sequelize, Sequelize);

db.film.belongsTo(db.character, {
  foreignKey: 'characterId',
  sourceKey: 'id',
});
db.filmgenre.belongsTo(db.film, {
  foreignKey: 'filmId',
  sourceKey: 'id',
});

module.exports = db;
