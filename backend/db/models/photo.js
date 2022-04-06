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
    Photo.belongsTo(models.User, { foreignKey: 'userId' });
    Photo.hasMany(models.Comment, { foreignKey: 'photoId', onDelete: 'CASCADE', hooks: true });
  };
  return Photo;
};
