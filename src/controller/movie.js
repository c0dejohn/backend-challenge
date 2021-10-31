const { logger } = require('../utils/logger');
const db = require('../models');
const Movie = db.movie;

exports.create = async (req, res, next) => {
  try {
    const { image, title, score, releaseDate, associatedCharacter, genreId } =
      await req.body;
    const result = await Movie.create({
      image: image,
      title: title,
      score: score,
      releaseDate: releaseDate,
      associatedCharacters: associatedCharacter,
      genreId: genreId,
    });
    res.status(201).json({ movie: result, message: 'Movie created' });
  } catch (error) {
    logger.info(error);
    next(error);
  }
};

// Retrieve all Movies from the database.
exports.findAll = (req, res) => {
  Movie.findAll({
    attributes: ['image', 'title', 'releaseDate'],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving movies.',
      });
    });
};

// Find a single Movie with an id
exports.findOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Movie.findByPk(id);
    res.status(200).json({ movie: result });
  } catch (error) {
    next(error);
  }
};

exports.findByFilter = async (req, res, next) => {
  try {
    const { name, genreId, order } = req.query;
    const key = name || genreId || order;
    logger.info(key);
    switch (key) {
      case name: {
        const nameResult = await Movie.findOne({ where: { title: name } });
        res.status(200).json({ movie: nameResult });
        break;
      }
      case genreId: {
        const genreResult = await Movie.findAll({
          where: { genreId: genreId },
        });
        res.status(200).json({ movie: genreResult });
        break;
      }
      case order: {
        const movieResult = await Movie.findAll({
          include: [{ model: db.genre, attributes: ['name'] }],
        });
        res.status(200).json({ data: movieResult });
        break;
      }
      default:
        break;
    }
  } catch (error) {
    next(error);
  }
};

// Update a Movie by the id in the request
exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { image, title, score, releaseDate, associatedCharacters } = req.body;
    const result = await Movie.update(
      {
        image: image,
        title: title,
        score: score >= 1 && score <= 5 ? score : null,
        releaseDate: releaseDate,
        associatedCharacters: associatedCharacters,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).json({ movie: result, message: 'Movie updated' });
  } catch (error) {
    next(error);
  }
};

//// Delete a Movie with the specified id in the request
exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Movie.destroy({
      where: {
        id: id,
      },
    });
    res.status(202).json({ movie: result, message: 'Movie deleted' });
  } catch (error) {
    next(error);
  }
};
