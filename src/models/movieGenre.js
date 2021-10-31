module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'movieGenre',
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
      associatedMovies: DataTypes.ARRAY(DataTypes.STRING),
      movieId: DataTypes.INTEGER,
    },

    {
      timestamps: true,
    }
  );
};
