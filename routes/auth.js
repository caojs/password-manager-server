const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router
  .get('/login', function(req, res) {
    res.render('login', { title: 'Login' });
  })
  .post('/login', auth.login)
  .get('/logout', auth.logout)
  .post('/create', auth.create);

module.exports = router;
