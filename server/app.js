const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');

const authRoutes = require('./routes/auth');
const routes = require('./routes/index');
const schema = require('./db/graphql/schema');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'oppa', resave: false, saveUninitialized: false }));
app.use(require('./middlewares/serializeUser'));
app.use(require('./middlewares/jadeLocals'));

// Api
app.use('/graphql', graphqlHTTP(request => ({
  schema: schema,
  graphiql: true,
  context: {
    user: request.user,
    session: request.session
  }
})));

app.use('/auth', authRoutes);

// static middleware and webpack
require('./middlewares/setup')(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
