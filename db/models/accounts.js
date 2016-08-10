const bookshelf = require('../bookshelf');
require('./users');

const Accounts = bookshelf.Model.extend({
  tableName: 'accounts',
  user: function() {
    this.hasOne('Users');
  }
});

module.exports = bookshelf.model('Accounts', Accounts);
