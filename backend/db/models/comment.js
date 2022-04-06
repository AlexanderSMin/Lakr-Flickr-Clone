'use strict';
const { User } = require("./user");
const { Photo } = require("./photo");
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    photoId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, { foreignKey: 'userId' } );
    Comment.belongsTo(models.Photo, { foreignKey: 'photoId',  hooks: true });
  };
  return Comment;
};
