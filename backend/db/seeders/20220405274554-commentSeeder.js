'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        userId: 1,
        photoId: 4,
        comment: "Home of the purple and gold!"
      },
      {
        userId: 1,
        photoId: 4,
        comment: "My favorite player ever."
      },
      {
        userId: 1,
        photoId: 4,
        comment: "Clean Picture"
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
