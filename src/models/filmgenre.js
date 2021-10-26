module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'filmGenre',
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
      associatedFilms: DataTypes.ARRAY(DataTypes.STRING),
      filmID: DataTypes.INTEGER,
    },

    {
      timestamps: true,
    }
  );
};
