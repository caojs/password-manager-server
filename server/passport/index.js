const passport = require('passport');
const { User } = require('../db');

require('./strategies.js');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  new User({ id })
    .fetch()
    .then(function (user) {
      done(null, user);
    })
    .catch(err => done(err));
});

module.exports = passport;
