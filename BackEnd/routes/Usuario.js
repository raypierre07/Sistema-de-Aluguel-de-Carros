const express = require('express');
const router = express.Router();
const AbstractUsuarioController = require("../Controllers/UsuarioController")

router.post('/atualizarSenha', AbstractUsuarioController.alterarSenha)

module.exports = router
