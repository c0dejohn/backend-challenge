const express = require('express');
const characterRouter = require('./src/routes/character.routes');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const PREFIX = '/api/my-disney';
const { PORT, NODE_ENV } = require('./src/config/index');
const { logger } = require('./src/utils/logger');

const corsOptions = {
  origin: '*',
};

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const db = require('./src/models');

if (NODE_ENV === 'development') {
  db.sequelize.sync({ force: false }).then(() => {
    logger.info('Database synced');
  });
} else {
  db.sequelize.sync();
}

app.get(`${PREFIX}/health`, (req, res) => {
  res.status(200).send({ status: 'OK' });
});

app.use(PREFIX, characterRouter);

app.listen(PORT, async () => {
  logger.info(`Listening on port: http://localhost:${PORT}`);
});
