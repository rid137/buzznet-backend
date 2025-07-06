'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Post', 'status', {
      type: Sequelize.ENUM('pending', 'approved', 'rejected'),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Post', 'status');
  }
};