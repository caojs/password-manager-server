var express = require('express');
var router = express.Router();

/* GET home page. */
router
  .get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  })
  .get('/login', function(req, res) {
    res.render('login', { title: 'Login', page: 'login' });
  })
  .get('/create', function(req, res) {
    res.render('login', { title: 'Sign up', page: 'create' });
  });

module.exports = router;
