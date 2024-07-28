'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('restaurants', 'view_counts', { 
      type: Sequelize.INTEGER,
      allowNull: false, 
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('restaurants', 'view_counts');
  }
};
