'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable('DeviceToken');
  },

  async down(queryInterface, Sequelize) {}
};
