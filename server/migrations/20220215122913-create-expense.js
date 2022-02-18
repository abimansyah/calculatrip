'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Expenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tripId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Trips',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      expenseCategoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'ExpenseCategories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      paymentMethodId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'PaymentMethods',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      expenseDate:{
        allowNull: false,
        type: Sequelize.DATE
      },
      location: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Expenses');
  }
};