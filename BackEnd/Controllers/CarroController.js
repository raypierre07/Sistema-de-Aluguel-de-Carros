const Carro = require('/Models/Carro')

async function criarCarro(req, res){
    try {
        const { matricula, ano, marca, modelo, placa} = req.body;

        const matricula_existente = await Carro.findByPk(matricula)

        if(matricula_existente === matricula){
            
        }
    }
}