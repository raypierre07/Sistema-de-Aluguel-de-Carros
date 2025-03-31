const { Model, DataTypes } = require('sequelize');
const sequelize = require('Config/db');

class PedidoAluguel extends Model{}

PedidoAluguel.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
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
        type: DataTypes.TIME,
        timestamps: true,
        allowNull: false
    },
    data_fim: {
        type: DataTypes.TIME,
        timestamps: true,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'PedidoAluguel',
    tableName: 'pedidoAluguel',
    timestamps: false
})

module.exports = PedidoAluguel