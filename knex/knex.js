const knex = require("knex");
const knexConfig = require("./Knexfile");
const dbConnection = knex(knexConfig);

module.exports = dbConnection;