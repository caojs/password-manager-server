const { User } = require('../db');

function exportUser(userId, req, res) {
  return new User({ id: userId })
    .fetch()
    .then(user => {
      if (user) {
        req.user = user.toJSON();
        res.locals.user = req.user;
      }
    });
}

function middleware(req, res, next) {
  var userId = req.session && req.session.userId;
  if (!userId) { return next(); }
  exportUser(userId, req, res)
    .then(() => next())
    .catch(next);
};

module.exports = middleware;
