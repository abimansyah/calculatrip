"use strict";
const fs = require("fs");
const {hasPassword} = require('../helpers/bcrypt')

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = JSON.parse(
      fs.readFileSync("./db/calculatrip user.json", "utf-8")
    );
    data.forEach((e) => {
      e.password = hasPassword(e.password)
      e.createdAt = new Date(),
      e.updatedAt = new Date()
    });
    return queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
