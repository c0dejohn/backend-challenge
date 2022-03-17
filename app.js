const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const characterRouter = require('./src/routes/character.routes');
const movieRouter = require('./src/routes/movie.routes');
const genreRouter = require('./src/routes/movieGenre.routes');
const userRouter = require('./src/routes/user.routes');
const authRouter = require('./src/routes/auth.routes');
const {
  logErrors,
  boomErrorHandler,
  ormErrorHandler,
} = require('./src/middlewares/error.handler');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const PREFIX = '/api/';
const { PORT, NODE_ENV } = require('./src/config/index');
const { logger } = require('./src/utils/logger');
const { auth } = require('./src/middlewares/auth.handler');
const corsOptions = {
  origin: '*',
};

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(
  session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
  })
);

const db = require('./src/models');

if (NODE_ENV === 'development') {
  db.sequelize.sync({ force: false }).then(() => {
    logger.info('Database synced');
  });
} else {
  db.sequelize.sync();
}

app.get(`${PREFIX}health`, (req, res) => {
  res.status(200).send({ status: 'OK' });
});
app.use(PREFIX, auth, authRouter);
app.use(PREFIX, auth, characterRouter);
app.use(PREFIX, auth, movieRouter);
app.use(PREFIX, auth, genreRouter);
app.use(PREFIX, auth, userRouter);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);

const server = app.listen(PORT, async () => {
  logger.info(`Listening on port: http://localhost:${PORT}`);
});

module.exports = { app, server };
