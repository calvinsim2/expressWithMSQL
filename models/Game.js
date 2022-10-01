module.exports = function (sequelize, DataTypes) {
  return sequelize.define("Game", {
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
};
