'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [{ name: 'Doctor' }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', { where: { name: 'Doctor' } });
  },
};
