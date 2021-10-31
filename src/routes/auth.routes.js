const express = require('express');
const authRouter = express.Router();
const userController = require('../controller/user');

authRouter
  .post('/auth/login', userController.login)
  .post('/auth/register', userController.register);

module.exports = authRouter;
