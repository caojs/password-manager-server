const { User } = require('../db');

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
        .then(user => ({ user: user }));
    });
}

function signup(req, res, next) {
  const {
    username,
    password,
    passwordAgain
  } = req.body;

  return canCreate(username, password, passwordAgain)
    .then(({ info, user }) => {

      if (!user) {
        return res.json({
          errors: [{ message: info }]
        });
      }

      req.login(user.toJSON(), (err) => {
        if (err) return next(err);
        res.json({ redirect: '/' });
      });
    })
    .catch(err => next(err));
}

module.exports = signup;
