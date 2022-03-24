const { logger } = require('../utils/logger');
const db = require('../models');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const User = db.user;
const boom = require('@hapi/boom');
const path = require('path');
require('dotenv').config();

exports.login = async (req, res, next) => {
  try {
    const { email, password } = await req.body;
    let user = await User.findOne({
      where: { email: email },
    });

    const pass = user.dataValues.password;
    const validUser = user.dataValues.email;
    if (!user) {
      return next(boom.unauthorized());
    }
    if (user.dataValues.email == email && bcrypt.compare(password, pass)) {
      req.session.user = validUser;
      res.status(202).json({ message: 'User logged in' });
    } else {
      return next(boom.unauthorized());
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send(error.errors);
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password } = await req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    await User.create({
      email: email,
      password: hashedPassword,
      role: 'user',
    });
    await res.status(201).json({ message: _sendMessage(email) });
  } catch (error) {
    logger.error(error);
    res.status(500).send(error.errors);
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: 'User logged out' });
};

exports.read = (req, res) => {
  User.findAll({
    attributes: ['id', 'email', 'role', 'password'],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      });
    });
};

// Update a User by the id in the request
exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { email, password } = req.body;
    const result = await User.update(
      {
        email: email,
        password: password,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).json({ data: result, message: 'User updated' });
  } catch (error) {
    next(error);
  }
};

//// Delete a User with the specified id in the request
exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await User.destroy({
      where: {
        id: id,
      },
    });
    res.status(202).json({ data: result, message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};

const clientId = process.env.OAUTH_CLIENTID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;
const refreshToken = process.env.OAUTH_REFRESH_TOKEN;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'johnmcloudev@gmail.com',
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken: refreshToken,
    // accessToken: myAccessToken,
  },
});

const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve('./views/'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./views/'),
};

const _sendMessage = (userEmail) => {
  // use a template file with nodemailer
  transporter.use('compile', hbs(handlebarOptions));
  const user = process.env.USER;
  const mailOptions = {
    from: user,
    to: userEmail,
    subject: 'Welcome',
    template: 'email',
    context: {
      name: 'User',
      company: 'Acme',
    },
  };

  // trigger the sending of the E-mail
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return logger.error(error);
    }
    logger.info('Message sent: ' + info.response);
  });
  return 'User created';
};
