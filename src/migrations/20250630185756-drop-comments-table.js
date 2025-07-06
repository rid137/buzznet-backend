'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  },

  async down(queryInterface, Sequelize) {}
};
