const Usuario = require("../Abstracts/AbstractUsuario");
const bcrypt = require('bcrypt');
const Cliente = require("../Models/Cliente")

async function alterarSenha(req, res) {
    try {
        const { senha, id } = req.body;

        if (!id || !senha) {
            return res.status(400).json({ error: "ID e senha são obrigatórios." });
        }

        const usuario = await Usuario.findOne({ where: { id } });

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }


        const hashedPassword = await bcrypt.hash(senha, 10);
        usuario.setDataValue('senha', hashedPassword);
        await usuario.save();

        res.status(200).json({ message: "Senha alterada com sucesso." });

    } catch (error) {
        console.error("Erro ao alterar a senha:", error);
        res.status(500).json({ error: "Erro ao alterar a senha." });
    }
}

async function registrarCliente(req, res){
    try{
        const { nome, email, profissao, rg, cpf, rua, numero, bairro, cidade, rendimento1, rendimento2, rendimento3, senha} = req.body

        if(!nome || !email || !profissao || !rg || !cpf || !rua || !numero || !bairro || !cidade || !rendimento1 || !rendimento2 || !rendimento3 || !senha){
            console.log(nome, email, profissao, rg, cpf, rua, numero, bairro, cidade, rendimento1, rendimento2, rendimento3, senha)
            return res.status(203).json({error: "Todos os campos precisam ser preenchidos"})
        }
        let id;
        do {
            id = Math.random() * (1 - 1000) + 1000
        } while (await Usuario.findByPk());

        const usuario = await Usuario.create({
            id: id,
            nome: nome,
            email: email,
            senha: senha
        });

        let endereco = rua + "," + numero + "," + bairro + "," + cidade

        const cliente = await Cliente.create({
            id: id,
            rg: rg,
            cpf: cpf,
            endereco: endereco,
            profissao: profissao
        })

        await usuario.save()
        await cliente.save()

        res.status(200).json({message: "Usuario criado"})

    }catch (error){
        console.error("Erro ao criar usuario", error)
        res.status(500).json({ error: "Erro ao criar usuario" });
    }
}

module.exports = {alterarSenha, registrarCliente}