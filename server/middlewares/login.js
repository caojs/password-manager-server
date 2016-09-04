const passport = require('passport');

module.exports = function(req, res, next) {
  passport.authenticate('local', (err, user, challenge, status) => {
    if (err) return next(err);

    if (user) return res.json({ redirect: '/' });

    res.json({
      errors: [challenge]
    });
  })(req, res, next);
};
