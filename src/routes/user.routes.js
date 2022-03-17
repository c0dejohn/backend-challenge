const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/user');

userRouter
  // .post('/users', userController.create)
  //.post('/auth/login', userController.login)
  //.post('/auth/register', userController.register)
  .get('/users', userController.read)
  .put('/users/:id', userController.update)
  .delete('/users/:id', userController.delete);

module.exports = userRouter;
