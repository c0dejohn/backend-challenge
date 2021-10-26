const express = require('express');
const characterRouter = express.Router();
const characterController = require('../controller/character');

characterRouter.post('/characters', characterController.create);
characterRouter.get('/characters', characterController.findAll);
characterRouter.get('/characters/:id', characterController.findOne);

module.exports = characterRouter;
