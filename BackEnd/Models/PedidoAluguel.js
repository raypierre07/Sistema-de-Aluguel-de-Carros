const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

class PedidoAluguel extends Model{}

PedidoAluguel.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'cliente',
            key: 'id'
        },
        allowNull: false
    },
    carro_matricula: {
        type: DataTypes.INTEGER,
        references: {
            model: 'carro',
            key: 'matricula'
        },
        allowNull: false
    },
    data_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data_fim: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM("Aberto", "Em analise", "Concluido", "Cancelado"),
        allowNull: false
    }
},{
    sequelize,
    modelName: 'pedido_aluguel',
    tableName: 'pedido_aluguel',
    timestamps: false
})

module.exports = PedidoAluguel