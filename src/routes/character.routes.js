const express = require('express');
const characterRouter = express.Router();
const characterController = require('../controller/character');

characterRouter.get('/characters', characterController.findAll);
characterRouter.get('/characters/find', characterController.findByFilter);
characterRouter.get('/characters/:id', characterController.findOne);
characterRouter.post('/characters', characterController.create);
characterRouter.put('/characters/:id', characterController.update);
characterRouter.delete('/characters/:id', characterController.delete);

module.exports = characterRouter;
