const express = require('express');
const characterRouter = express.Router();
const characterController = require('../controller/character');

characterRouter
  .get('/characters', characterController.findAll)
  .get('/characters/find', characterController.findByFilter)
  .get('/characters/:id', characterController.findOne)
  .post('/characters', characterController.create)
  .put('/characters/:id', characterController.update)
  .delete('/characters/:id', characterController.delete);

module.exports = characterRouter;
