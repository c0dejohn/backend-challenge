module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'film',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      image: DataTypes.STRING,
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      score: {
        type: DataTypes.INTEGER,
      },
      releaseDate: DataTypes.DATE,
      associatedCharacters: DataTypes.ARRAY(DataTypes.STRING),
      characterId: DataTypes.INTEGER,
    },

    {
      timestamps: true,
    }
  );
};
