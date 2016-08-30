const bookshelf = require('./bookshelf.js');
const knex = require('./knex.js');
const { User, Users } = require('./models/users.js');
const { Account, Accounts } = require('./models/accounts.js');

module.exports = {
  bookshelf,
  knex,
  User,
  Users,
  Account,
  Accounts
};
