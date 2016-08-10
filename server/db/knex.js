const config = require('../../knexfile.js');
const env = 'development';
const knex = require('knex')(config[env]);

knex.migrate.latest([config[env].migrations]);

module.exports = knex;
