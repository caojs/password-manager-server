const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router
  .post('/login', auth.login)
  .get('/logout', auth.logout)
  .post('/create', auth.create);

module.exports = router;
