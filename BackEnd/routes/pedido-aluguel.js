const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pedido-aluguel');
});

module.exports = router;
