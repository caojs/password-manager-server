const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const bookshelf = require('../bookshelf');
require('./accounts');

const Users = bookshelf.Model.extend({
  tableName: 'users',

  hasTimestamps: true,

  constructor: function() {
    bookshelf.Model.apply(this, arguments);

    this.on('saving', function(model, attrs, options) {
      if (!attrs.password) return;
      return bcrypt
        .hashAsync(model.get('password'), 10)
        .then(hash => model.set('password', hash))
        .catch(err => { throw err; });

    });
  },

  accounts: function() {
    this.hasMany('Accounts');
  }
});

module.exports = bookshelf.model('Users', Users);
