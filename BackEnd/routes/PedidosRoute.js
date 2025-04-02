const express = require('express');
const router = express.Router();
const PedidoAluguelController = require("../Controllers/PedidoAluguelController")

router.post('/fazerPedido', PedidoAluguelController.criarPedido)

module.exports = router