const bookshelf = require('../bookshelf');
require('./users');

const Account = bookshelf.Model.extend({
  tableName: 'accounts',

  hasTimestamps: true,

  user: function() {
    this.hasOne('Users');
  }
});

const Accounts = bookshelf.Collection.extend({
  model: Account
});

exports.Account = bookshelf.model('Account', Account);
exports.Accounts = Accounts;
