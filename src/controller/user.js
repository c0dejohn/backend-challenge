const { logger } = require('../utils/logger');
const db = require('../models');
const bcrypt = require('bcrypt');
const User = db.user;
const boom = require('@hapi/boom');

exports.create = async (req, res) => {
  try {
    const { email, password, role } = await req.body;
    const hashedPassword = await bcrypt.hashSync(
      password,
      bcrypt.genSaltSync(10),
      null
    );
    await User.create({
      email: email,
      password: hashedPassword,
      role: role,
    });
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    logger.error(error);
    res.status(500).send(error.errors.map((e) => e.message));
  }
};

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
    res.status(201).json({ message: 'User created' });
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
