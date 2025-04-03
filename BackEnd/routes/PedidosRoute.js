const express = require('express');
const router = express.Router();
const PedidoAluguelController = require("../Controllers/PedidoAluguelController")
const CarroController = require("../Controllers/CarroController")

router.post('/fazerPedido', PedidoAluguelController.criarPedido)
router.post('/modificarPedido', PedidoAluguelController.modificarPedido)
router.post('/buscarPedido', PedidoAluguelController.consultarPedido)

router.get("/", CarroController.listarCarros);
router.get("/", PedidoAluguelController.listarPedidosCliente)

module.exports = router