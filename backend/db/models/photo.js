'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Photo.associate = function(models) {
    // associations can be defined here
  };
  return Photo;
};