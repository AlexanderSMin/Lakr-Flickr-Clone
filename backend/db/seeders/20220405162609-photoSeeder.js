'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Photos', [
    {
      userId: 1,
      imageUrl: "https://d.newsweek.com/en/full/1934163/staples-center-name-change-cryptocom.jpg?w=1600&h=1200&q=88&f=db17790e5aa33a63600eb57e49c62158",
      description: "Before it was changed",
    },
    {
      userId: 1,
      imageUrl: "https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F200127113019-kobe-bryant-black-mamba-trnd.jpg",
      description: "Black Mamba, Attack Conquer",
    },
    {
      userId: 1,
      imageUrl: "https://vault.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY5MDk4NDg2NzA1MTA0MTYx/magic-johnson-return-1996-lead-photojpg.jpg",
      description: "32",
    },
  ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Photos', null, {});

  }
};
