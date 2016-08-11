module.exports = function(req, res, next) {
  res.locals.user = req.user;
  console.log(req.user);
  next();
};
