// Import the Sequelize constructor from the library.
const Sequelize = require("sequelize");

// Create connection to the database, pass in MySQL information for username and password.
const sequelize = new Sequelize("logistics_db", "username", "password", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

module.exports = sequelize;
