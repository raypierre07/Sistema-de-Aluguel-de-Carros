const express = require('express');
const router = express.Router();
const PedidoAluguelController = require("../Controllers/PedidoAluguelController")

router.post('/fazerPedido', PedidoAluguelController.criarPedido)
router.post('/modificarPedido', PedidoAluguelController.modificarPedido)
router.post('/buscarPedido', PedidoAluguelController.consultarPedido)

module.exports = router