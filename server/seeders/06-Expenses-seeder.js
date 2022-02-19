'use strict';
const fs = require("fs");

module.exports = {
  async up (queryInterface, Sequelize) {
    let data = JSON.parse(
      fs.readFileSync("./db/expense.json", "utf-8")
    );
    data.forEach((e) => {
      e.createdAt = new Date(),
      e.updatedAt = new Date()
    });
    return queryInterface.bulkInsert("Expenses", data, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Expenses", null, {});
  }
};
