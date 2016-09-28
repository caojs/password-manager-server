const { User } = require('../db');
const { fromServer: actionFromServer } = require('../../share/actionCreators');
const { LOGIN, SIGNUP } = require('../../share/actionCreators/constants');

function canCreate(username, password, passwordAgain) {
  return new User({ username })
    .fetch()
    .then(function(user) {
      if (user)
        return { info: 'User already exist' };

      if (password !== passwordAgain)
        return { info: 'Passwords are not the same.' };

      return new User()
        .save({
          username: username,
          password: password
        })
        .then(user => ({ user: user.toJSON() }));
    });
}

function signup(req, res, next) {
  const {
    username,
    password,
    passwordAgain
  } = req.body;

  if (!username || !password || !passwordAgain) {
    return res.json(actionFromServer(
      { errors: [{ message: 'Missing credential.' }]},
      { type: SIGNUP }
    ));
  }

  return canCreate(username, password, passwordAgain)
    .then(({ info: message, user }) => {

      if (!user) {
        return res.json(actionFromServer(
          { errors: [{ message }] },
          { type: SIGNUP }
        ));
      }

      req.login(user, (err) => {
        if (err) return next(err);
        res.json(actionFromServer(
          { data: { user } },
          { type: LOGIN }
        ));
      });
    })
    .catch(err => next(err));
}

module.exports = signup;
