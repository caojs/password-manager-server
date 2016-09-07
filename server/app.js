require('babel-register');
require('isomorphic-fetch');

const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');

const config = require('./config');
const wpConfig = require('../webpack/defaults');
const schema = require('./db/graphql/schema');
const passport = require('./passport');
const { login, logout, signup, cookieFetch } = require('./middlewares');

const app = express();

app.use(logger('dev'));
app.use(wpConfig.publicPath, express.static(wpConfig.outputPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());

// Authentication
// -----------------------------------------------------------------------------
app.post('/signup', signup);
app.post('/login', login);
app.get('/logout', logout);

// Include cookies to fetch api.
// -----------------------------------------------------------------------------
app.use(cookieFetch);

// Graphql
// -----------------------------------------------------------------------------
app.use('/graphql', graphqlHTTP(req => ({
  schema: schema,
  graphiql: true,
  context: {
    user: req.user
  }
})));

// static middleware and webpack
require('./severRendering')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers
if (app.get('env') === 'development') {
  const PrettyError = require('pretty-error');
  const pe = new PrettyError();

  app.use(function(err, req, res, next) {
    console.log(pe.render(new Error('Some error message')));
    next(err);
  });
}

app.use(require('errorhandler')());

module.exports = app;
