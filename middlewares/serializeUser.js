const { Users } = require('../db');

module.exports = function(req, res, next) {
  var userId = req.session && req.session.userId;
  if (!userId) { return next(); }
  new Users({ id: userId })
    .fetch()
    .then(function (user) {
      req.user = user;
      next();
    })
    .catch(next);
};
