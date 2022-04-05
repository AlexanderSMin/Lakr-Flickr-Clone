'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    upatedAt: DataTypes.DATE
  }, {});
  Album.associate = function(models) {
    // associations can be defined here
  };
  return Album;
};