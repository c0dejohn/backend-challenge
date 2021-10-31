const express = require('express');
const authRouter = express.Router();
const userController = require('../controller/user');

authRouter
  .post('/auth/login', userController.login)
  .post('/auth/register', userController.register)
  .delete('/auth/logout', userController.logout);

module.exports = authRouter;
