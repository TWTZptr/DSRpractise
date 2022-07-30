'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Doctors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      education: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: '',
      },
      experience: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      achievements: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      service_types: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    });

    await queryInterface.addColumn('Visits', 'doctor_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Doctors',
        key: 'id',
      },
      onDelete: 'set null',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Visits', 'doctor_id');
    await queryInterface.dropTable('Doctors');
  },
};
