const Usuario = require("../Abstracts/AbstractUsuario");
const bcrypt = require('bcrypt');

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

module.exports = {alterarSenha}