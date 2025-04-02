const express = require('express');
const router = express.Router();
const PedidoAluguelController = require("../Controllers/PedidoAluguelController")

router.post('/fazerPedido', PedidoAluguelController.criarPedido)
router.post('/modificarPedido', PedidoAluguelController.modificarPedido)

module.exports = router