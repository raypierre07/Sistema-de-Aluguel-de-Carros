const Cliente = require('../Models/Cliente')
const {where} = require("sequelize");
const Usuario = require("../Abstracts/AbstractUsuario")

async function login(req, res){
    try {
        const { email, senha } = req.body

        if(!email || !senha){
            return res.status(204).json({error: "Preencha todos os campos"})
        }

        const usuario = await Usuario.findOne({where: { email }})

        if(!usuario){
            return res.status(401).json({error: "Usuario nao encontrado"})
        }

        if((await usuario).getDataValue("senha") !== senha){
            return res.status(401).json({error: "Senha incorreta"})
        }

        return res.status(200).json({message: "entrou"})

    }catch (error){
        console.error("Nao foi possivel fazer login", error)
        res.status(500).json({ error: "Nao foi possivel fazer login" });
    }
}

async function registrar(req, res){
    try {
        const { nome, email, rg, cpf, profissao, rua, numero, bairro, cidade, rendimento01, rendimento02, rendimento03, senha } = req.body;

        // Verificar se todos os campos obrigatórios foram preenchidos
        if (!nome || !email || !rg || !cpf || !rua || !profissao|| !numero || !bairro || !cidade || !rendimento01 || !senha) {
            return res.status(400).json({ error: 'Todos os campos obrigatórios precisam ser preenchidos' });
        }

        // Criar endereço combinado
        const endereco = `${rua}, ${numero}, ${bairro}, ${cidade}`;

        // Criar novo cliente no banco de dados
        const novoCliente = await Cliente.create({
            nome,
            email,
            rg,
            cpf,
            profissao,
            endereco,
            rendimento01,
            rendimento02,
            rendimento03,
            senha
        });

        res.status(201).json({ message: 'Cliente registrado com sucesso!', cliente: novoCliente });
    } catch (err) {
        console.error('Erro ao registrar cliente:', err);
        res.status(500).json({ error: 'Erro ao registrar cliente' });
    }

}


module.exports = { login, registrar}