require('babel-register');
require('isomorphic-fetch');

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');

const schema = require('./db/graphql/schema');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'oppa', resave: false, saveUninitialized: false }));
app.use(flash());
app.use(require('./middlewares/serializeUser'));
app.use(require('./middlewares/cookieFetch'));

// Graphql
app.use('/graphql', graphqlHTTP(req => ({
  schema: schema,
  graphiql: true,
  context: {
    user: req.user,
    session: req.session
  }
})));

// Authentication
app.use(require('./routes/auth'));

// static middleware and webpack
require('./setupRendering')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

//TODO: need consider
app.use(require('errorhandler')());

module.exports = app;
