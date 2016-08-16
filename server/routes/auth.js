const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router
  .post('/signin', auth.login)
  .get('/signout', auth.logout)
  .post('/signup', auth.create);

module.exports = router;
