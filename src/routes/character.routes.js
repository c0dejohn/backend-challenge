const express = require('express');
const characterRouter = express.Router();
const characterController = require('../controller/character');

characterRouter.get('/characters', characterController.findByName);
characterRouter.post('/characters', characterController.create);
characterRouter.get('/characters', characterController.findAll);
characterRouter.get('/characters/:id', characterController.findOne);
characterRouter.put('/characters/:id', characterController.update);
characterRouter.delete('/characters/:id', characterController.delete);

module.exports = characterRouter;
