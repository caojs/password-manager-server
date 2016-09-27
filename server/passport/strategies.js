var { Promise } = require('bluebird');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var compareAsync = Promise.promisify(require('bcrypt').compareAsync);

var { User } = require('../db');

passport.use(new LocalStrategy(function(username, password, done) {
  new User({ username })
    .fetch()
    .then(user => {
      if (!user)
        return done(null, false, { message: 'User doesn\'t exist.' });

      compareAsync(password, user.get('password'))
        .then(result => {
          if (!result)
            return done(null, false, { message: 'Password doesn\'t match.' });
          done(null, user.toJSON());
        });
    })
    .catch(err => done(err));
}));

module.exports = passport;
