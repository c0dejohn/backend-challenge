const express = require('express');
const movieRouter = express.Router();
const movieController = require('../controller/movie');

movieRouter
  .get('/movies', movieController.findAll)
  .get('/movies/find', movieController.findByFilter)
  .get('/movies/:id', movieController.findOne)
  .post('/movies', movieController.create)
  .put('/movies/:id', movieController.update)
  .delete('/movies/:id', movieController.delete);

module.exports = movieRouter;
