const bookshelf = require('./bookshelf.js');
const knex = require('./knex.js');
const Users = require('./models/users.js');
const Accounts = require('./models/accounts.js');

module.exports = {
  bookshelf,
  knex,
  Users,
  Accounts
};
