const Cliente = require('../Models/Cliente')
const {where} = require("sequelize");
const Usuario = require("../Abstracts/AbstractUsuario")

async function login(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ error: "Preencha todos os campos" });
        }

        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(401).json({ error: "Usuário não encontrado" });
        }

        if (usuario.getDataValue("senha") !== senha) {
            return res.status(401).json({ error: "Senha incorreta" });
        }

        // Salvar informações do usuário na sessão
        req.session.user = {
            id: usuario.getDataValue("id"),
            email: usuario.getDataValue("email"),
        };

        // Responder com o redirecionamento
        return res.status(200).json({ redirect: "/pedido-aluguel" });

    } catch (error) {
        console.error("Não foi possível fazer login", error);
        res.status(500).json({ error: "Não foi possível fazer login" });
    }
}

async function registrarCliente(req, res){
    try{
        const { nome, email, profissao, rg, cpf, rua, numero, bairro, cidade, rendimento1, rendimento2, rendimento3, senha} = req.body

        if(!nome || !email || !profissao || !rg || !cpf || !rua || !numero || !bairro || !cidade || !rendimento1 || !rendimento2 || !rendimento3 || !senha){
            return res.status(203).json({error: "Todos os campos precisam ser preenchidos"})
        }


        const usuario = await Usuario.create({
            nome: nome,
            email: email,
            senha: senha
        });

        const usuarioCriado = await Usuario.findOne({ where: { email: email } });

        if (!usuarioCriado || !usuarioCriado.id) {
            return res.status(500).json({ error: "Erro ao criar usuário, ID não foi gerado." });
        }


        let endereco = `${rua}, ${numero}, ${bairro}, ${cidade}`

        const cliente = await Cliente.create({
            id: usuarioCriado.id,
            rg: rg,
            cpf: cpf,
            endereco: endereco,
            profissao: profissao
        })



        res.status(200).json({message: "Cliente criado"})

    }catch (error){
        console.error("Erro ao criar cliente", error)
        res.status(500).json({ error: "Erro ao criar cliente" });
    }


}


module.exports = { login, registrarCliente}