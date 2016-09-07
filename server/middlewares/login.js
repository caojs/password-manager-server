const passport = require('passport');
const createAction = require('redux-actions/lib/createAction');
const { fromServer: actionFromServer } = require('../../share/actionCreators');
const { LOGIN } = require('../../share/actionCreators/constants');

module.exports = function(req, res, next) {
  passport.authenticate('local', (err, user, challenge, status) => {
    if (err) return next(err);

    if (!user) return res.json(actionFromServer(
      { errors: [challenge] },
      { type: LOGIN }
    ));

    req.login(user, function(err) {
      if (err) return next(err);

      res.json(actionFromServer(
        { data: { user }},
        { type: LOGIN }
      ));
    });
  })(req, res, next);
};
