const Pedido = require('../Models/PedidoAluguel'); // Importar o modelo Pedido
const Cliente = require('../Models/Cliente');
const Carro = require('../Models/Carro');
const Usuario = require("../Abstracts/AbstractUsuario");

async function criarPedido(req, res) {
    try {
        const { cliente_id, carro_matricula, data_inicio, data_fim } = req.body;


        const cliente = await Cliente.findByPk(cliente_id);
        const carro = await Carro.findByPk(carro_matricula);

        if (!cliente_id || !carro_matricula || !data_inicio || !data_fim) {
            return res.status(400).json({error: "Dados insuficientes para criar o pedido"});
        }

        // let id;
        // do {
        //     id = Math.random() * (1 - 1000) + 1000
        // } while (await Usuario.findByPk());


        const pedido = await Pedido.create({
            // id: id,
            cliente_id: cliente_id,
            carro_matricula: carro_matricula,
            data_inicio: data_inicio,
            data_fim: data_fim,
            status: "Aberto"
        });

        res.status(201).json({message: "Pedido criado com sucesso", pedido});
    } catch (error) {
        console.error("Erro ao criar pedido", error);
        res.status(500).json({error: "Erro ao criar pedido"});
    }
}

module.exports = { criarPedido };