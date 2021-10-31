const { logger } = require('../utils/logger');
const db = require('../models');
const MovieGenre = db.movieGenre;

exports.create = async (req, res) => {
  try {
    const { image, name, associatedMovie } = await req.body;
    const result = await MovieGenre.create({
      image: image,
      name: name,
      associatedMovies: associatedMovie,
    });
    res.status(201).json({ data: result, message: 'MovieGenre created' });
  } catch (error) {
    logger.info(error);
    res.status(500).send(error.errors.map((e) => e.message));
  }
};

// Retrieve all MovieGenres from the database.
exports.findAll = (req, res) => {
  MovieGenre.findAll({
    attributes: ['image', 'name'],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving MovieGenres.',
      });
    });
};

// Find a single MovieGenre with an id
exports.findOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await MovieGenre.findByPk(id);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

// Update a MovieGenre by the id in the request
exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { image, name, associatedMovies } = req.body;
    const result = await MovieGenre.update(
      {
        image: image,
        name: name,
        associatedMovies: associatedMovies,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).json({ data: result, message: 'MovieGenre updated' });
  } catch (error) {
    next(error);
  }
};

//// Delete a MovieGenre with the specified id in the request
exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await MovieGenre.destroy({
      where: {
        id: id,
      },
    });
    res.status(202).json({ data: result, message: 'MovieGenre deleted' });
  } catch (error) {
    next(error);
  }
};
