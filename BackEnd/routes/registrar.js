const express = require('express');
const ClienteController = require("../Controllers/ClienteController");
const router = express.Router();

router.get('/registrar', (req, res) => {
    res.render('register')
})

router.post('/registrarCliente', ClienteController.registrar)

module.exports = router