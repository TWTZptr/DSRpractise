'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PetTypes', [
      { name: 'Кот' },
      { name: 'Собака' },
      { name: 'Кролик' },
    ]);
    await queryInterface.bulkInsert('Roles', [
      { name: 'Admin' },
      { name: 'Client' },
    ]);
    const adminRole = await queryInterface.sequelize.query(
      'SELECT * FROM "Roles" WHERE name = ?',
      {
        replacements: ['Admin'],
        type: queryInterface.sequelize.QueryTypes.SELECT,
      },
    );

    const adminRoleId = adminRole[0].id;

    await queryInterface.bulkInsert('Users', [
      {
        login: 'admin',
        email: 'admin@admin.ru',
        password:
          '$2b$10$v0lRH8/OuYTCg8r2rWJYCe0Hy/0/FssRN0zIo/eQ3rdvNcN/pohmi',
        name: 'admin',
        role_id: adminRoleId,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PetTypes', null);
    await queryInterface.bulkDelete('Users', null);
    await queryInterface.bulkDelete('Roles', null);
  },
};
