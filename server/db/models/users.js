const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const bookshelf = require('../bookshelf');
require('./accounts');

const User = bookshelf.Model.extend({
  tableName: 'users',

  hasTimestamps: true,

  hidden: ['password'],

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
    this.hasMany('Account');
  }
});

const Users = bookshelf.Collection.extend({
  model: User
});

exports.User = bookshelf.model('User', User);
exports.Users = Users;
