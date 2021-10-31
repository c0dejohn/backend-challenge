const express = require('express');
const movieGenreRouter = express.Router();
const movieGenreController = require('../controller/movieGenre');

movieGenreRouter
  .get('/genres', movieGenreController.findAll)
  .get('/genres/:id', movieGenreController.findOne)
  .post('/genres', movieGenreController.create)
  .put('/genres/:id', movieGenreController.update)
  .delete('/genres/:id', movieGenreController.delete);

module.exports = movieGenreRouter;
