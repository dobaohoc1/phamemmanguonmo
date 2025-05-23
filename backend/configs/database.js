const { Sequelize } = require("sequelize");
const path = require("path");

var sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "../database.db"),
    logging: false,
});

module.exports = sequelize;