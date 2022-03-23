const { logger } = require('../utils/logger');
const db = require('../models');
const Character = db.character;

exports.create = async (req, res) => {
  try {
    const { image, name, age, history, weight, associatedMovie, movieId } =
      await req.body;
    const result = await Character.create({
      image: image,
      name: name,
      age: age,
      history: history,
      weight: weight,
      associatedMovies: associatedMovie,
      movieId: movieId,
    });
    res.status(201).json({ data: result, message: 'Character created' });
  } catch (error) {
    logger.info(error);
    res.status(500).send(error.errors.map((e) => e.message));
  }
};

// Retrieve all Characters from the database.
exports.findAll = (req, res) => {
  Character.findAll({
    attributes: ['image', 'name'],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Characters.',
      });
    });
};

// Find a single Character with an id
exports.findOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Character.findByPk(id);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

exports.findByFilter = async (req, res, next) => {
  try {
    const { name, age, movies } = req.query;
    logger.info(movies);
    const key = name || age || movies;
    switch (key) {
      case name: {
        const nameResult = await Character.findOne({ where: { name: name } });
        res.status(200).json({ data: nameResult });
        break;
      }
      case age: {
        const ageResult = await Character.findAll({ where: { age: age } });
        res.status(200).json({ data: ageResult });
        break;
      }
      case movies: {
        const movieResult = await Character.findAll({
          where: { filmId: parseInt(movies) },
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

// Update a Character by the id in the request
exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { image, name, age, history, weight, associatedMovies } = req.body;
    const result = await Character.update(
      {
        image: image,
        name: name,
        age: age,
        history: history,
        weight: weight,
        associatedMovies: associatedMovies,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).json({ data: result, message: 'Character updated' });
  } catch (error) {
    next(error);
  }
};

// Delete a Character with the specified id in the request
exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Character.destroy({
      where: {
        id: id,
      },
    });
    res.status(202).json({ data: result, message: 'Character deleted' });
  } catch (error) {
    next(error);
  }
};

exports.sum = (a, b) => {
  return a * b;
};
