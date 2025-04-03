const Carro = require("../Models/Carro");

async function listarCarros(req, res) {
    try {
        if (!req.session.user) {
            return res.redirect("/");
        }

        const carros = await Carro.findAll();

        res.render("pedido-aluguel", {
            clientId: req.session.user.id,
            cars: carros
        });

    } catch (error) {
        console.error("Erro ao buscar carros:", error);
        res.status(500).send("Erro ao carregar os carros disponíveis.");
    }
}

module.exports = { listarCarros };
