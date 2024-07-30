'use strict';
const faker = require('faker')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    const userCount = 50
    const restaurantCount = 50
    const comments = []

    for(let i = 0; i < 150; i++){
      comments.push({
        text: faker.lorem.sentence(),
        user_id: Math.floor(Math.random() * userCount) + 1,
        restaurant_id: Math.floor(Math.random() * restaurantCount) + 1,
        created_at: new Date(),
        updated_at: new Date()
      })
    }

    await queryInterface.bulkInsert('Comments', comments, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {})
  }
};
