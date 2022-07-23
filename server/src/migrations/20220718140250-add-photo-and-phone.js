'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'phone', {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: '',
    });

    await queryInterface.addColumn('Pets', 'photo', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'phone');
    await queryInterface.removeColumn('Pets', 'photo');
  },
};
