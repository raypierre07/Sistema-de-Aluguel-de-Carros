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


        const pedido = await Pedido.create({
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

async function modificarPedido(req, res) {
    try {
        const { pedido_id, carro_matricula, data_inicio, data_fim, status } = req.body;

        // Validação: Campos obrigatórios
        if (!pedido_id || !carro_matricula || !data_inicio || !data_fim || !status) {
            return res.status(400).json({ error: "Preencha todos os campos" });
        }

        // Encontrar o pedido
        const pedido = await Pedido.findByPk(pedido_id);

        // Verificar se o pedido existe
        if (!pedido) {
            return res.status(404).json({ error: "Pedido não encontrado" }); // Use 404 em vez de 401
        }

        // Atualizar o pedido
        await pedido.update({
            carro_matricula: carro_matricula,
            data_inicio: data_inicio,
            data_fim: data_fim,
            status: status
        });

        // Retornar sucesso
        return res.status(200).json({ message: "Pedido alterado com sucesso", pedido });

    } catch (err) {
        console.error("Erro ao modificar pedido:", err);
        return res.status(500).json({ error: "Erro ao modificar pedido" });
    }
}


module.exports = { criarPedido, modificarPedido};