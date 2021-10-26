module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'character',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      image: DataTypes.STRING,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      age: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      history: DataTypes.STRING,
      weight: DataTypes.FLOAT,
      associatedFilms: DataTypes.ARRAY(DataTypes.STRING),
      filmId: DataTypes.INTEGER,
    },
    {
      timestamps: true,
    }
  );
};
