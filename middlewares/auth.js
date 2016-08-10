const bcrypt = require('bcrypt');
const { Users } = require('../db');

function login(req, res, next) {
  const { username, password } = req.body;
  new Users({ username: username })
    .fetch()
    .then(function(user) {
      if (!user) {
        throw new Error('User doesn\'t exist');
      }

      bcrypt.compare(password, user.password, function(err, result) {
        if (err) {
          // TODO: handle err
          next(err);
        }
        if (result) {
          req.session.userId = user.id;
          res.redirect('/');
          // TODO: handle redirect or return response
        }
        else {
          // TODO: handle not match password.
          next(new Error('Password doesn\'t match'));
        }
      });
    })
    .catch(next);
}

function logout(req, res, next) {
  req.session.destroy(function(err) {
    next(err);
  });
}

function create(req, res, next) {
  const { username, password } = req.body;

  new Users({ username: username })
    .fetch()
    .then(function(user) {
      if (user) {
        throw new Error('User already exist');
      }
      return new Users({
        username: username,
        password: password
      })
      .save();
    })
    .catch(function(err) {
      next(err);
    });
}

exports.login = login;
exports.logout = logout;
exports.create = create;
