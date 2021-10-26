const { logger } = require('../utils/logger');
const db = require('../models');
const Character = db.character;

exports.create = async (req, res) => {
  try {
    const {
      image,
      name,
      age,
      history,
      weight,
      associatedFilms,
    } = await req.body;
    const result = await Character.create({
      image: image,
      name: name,
      age: age,
      history: history,
      weight: weight,
      associatedFilms: associatedFilms,
    });
    res.send(result);
  } catch (error) {
    logger.error(error);
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
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Character.findByPk(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error.errors.map((e) => e.message));
  }
};

// Update a Character by the id in the request
//exports.update = (req, res) => {};
//
//// Delete a Character with the specified id in the request
//exports.delete = (req, res) => {};
