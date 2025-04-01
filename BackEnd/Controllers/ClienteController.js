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

module.exports = { login }