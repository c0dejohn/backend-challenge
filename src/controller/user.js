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
    res.status(201).json({ data: result, message: 'Character created' });
  } catch (error) {
    logger.error(error);
    res.status(500).send(error.errors.map((e) => e.message));
  }
};

// Update a Character by the id in the request
exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { image, name, age, history, weight, associatedFilms } = req.body;
    const result = await Character.update(
      {
        image: image,
        name: name,
        age: age,
        history: history,
        weight: weight,
        associatedFilms: associatedFilms,
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

//// Delete a Character with the specified id in the request
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
