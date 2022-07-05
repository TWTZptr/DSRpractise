'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PetTypes', [{ name: 'Кот' }, { name: 'Собака' }, { name: 'Кролик' }]);
    await queryInterface.bulkInsert('Roles', [{ name: 'Клиент' }, { name: 'Администратор' }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PetTypes', null);
    await queryInterface.bulkDelete('Roles', null);
  },
};
