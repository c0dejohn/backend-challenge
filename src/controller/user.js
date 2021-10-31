const { logger } = require('../utils/logger');
const db = require('../models');
const bcrypt = require('bcrypt');
const User = db.user;

exports.create = async (req, res) => {
  try {
    const { email, password, role } = await req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
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

exports.login = async (req, res) => {
  try {
    const { email, password } = await req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.findOne({
      where: {
        email: email,
        password: hashedPassword,
      },
    });
    if (result === null || result === undefined) {
      res.status(401).json({ message: 'Login failed' });
    } else {
      res.status(202).json({ message: 'Login success' });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send(error.errors);
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password } = await req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email: email,
      password: hashedPassword,
      role: 'user',
    });
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    logger.error(error);
    res.status(500).send(error.errors.map((e) => e.message));
  }
};

exports.read = (req, res) => {
  User.findAll({
    attributes: ['id', 'email', 'role'],
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
