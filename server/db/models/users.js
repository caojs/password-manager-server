const bcrypt = require('bcrypt');
const bookshelf = require('../bookshelf');
require('./accounts');

const Users = bookshelf.Model.extend({
  tableName: 'users',
  constructor: function() {
    bookshelf.Model.apply(this, arguments);
    this.on('saving', function(model, attrs, options) {
      return new Promise(function(res, rej) {
        if (!~attrs.indexOf('password')) {
          return res();
        }
        bcrypt.hash(model.get('password'), 10, function(err, hash) {
          if (err) {
            rej(new Error('Error when hashing password.'));
          }
          model.set('password', hash);
          res();
        });
      });
    });
  },
  accounts: function() {
    this.hasMany('Accounts');
  }
});

module.exports = bookshelf.model('Users', Users);
