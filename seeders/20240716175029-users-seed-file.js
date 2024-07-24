'use strict';
const bcrypt = require('bcryptjs')
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 測試資料
    await queryInterface.bulkInsert('Users', [{
      email: 'root@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: true,
      name: 'root',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user1@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      name: 'user1',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user2@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      name: 'user2',
      created_at: new Date(),
      updated_at: new Date()
    }
    ], {})

    // Faker生成的用户数据
    const fakeUsers = Array.from({ length: 50 }, () => ({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      is_admin: false,
      created_at: new Date(),
      updated_at: new Date()
    }));

    await queryInterface.bulkInsert('Users', fakeUsers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {});
  }
};
