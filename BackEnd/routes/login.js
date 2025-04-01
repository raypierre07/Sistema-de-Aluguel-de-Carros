const express = require('express');
const router = express.Router();
const ClienteController = require('../Controllers/ClienteController')

router.get('/', (req, res) => {
  res.render('login')
})

router.post('/login', ClienteController.login)

module.exports = router