const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const { Users } = require('../db');

function flashError(req, res, err) {
  const isDev = req.app.get('env') === 'development';
  req.flash('error', [err.message].concat(isDev ? err.stack : null));
  res.redirect(req.url);
}

function canLogin(username, password) {
  return new Users({ username: username })
    .fetch()
    .then(function(user) {
      if (!user) {
        throw new Error('User doesn\'t exist');
      }

      return bcrypt
        .compareAsync(password, user.get('password'))
        .then(function(result) {
          if (!result) {
            throw new Error('Password doesn\'t match');
          }
          return user.get('id');
        });
    });
}

function login(req, res, next) {
  const {
    username,
    password
  } = req.body;

  return canLogin(username, password)
    .then(userId => {
      req.session.userId = userId;
      res.redirect('/');
    })
    .catch(err => flashError(req, res, err));
}

function logout(req, res, next) {
  req.session.destroy(function(err) {
    if (err) return next(err);
    res.redirect('/login');
  });
}

function canCreate(username, password, passwordAgain) {
  return new Users({ username: username })
    .fetch()
    .then(function(user) {
      if (user) {
        throw new Error('User already exist');
      }

      if (password !== passwordAgain) {
        throw new Error('Passwords are not the same.');
      }

      return new Users()
        .save({
          username: username,
          password: password
        });
    });
}

function signup(req, res, next) {
  const {
    username,
    password,
    passwordAgain
  } = req.body;

  return canCreate(username, password, passwordAgain)
    .then(() => login(req, res, next))
    .catch(err => flashError(req, res, err));
}

exports.login = login;
exports.logout = logout;
exports.signup = signup;
