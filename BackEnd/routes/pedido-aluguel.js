const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }

    res.render('pedido-aluguel', { clientId: req.session.user.id });
});

module.exports = router;
