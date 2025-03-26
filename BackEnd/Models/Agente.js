const { Model, DataTypes } = require('sequelize');
const sequelize = require('Config/db');
const AbstractUsuario = require('Abstracts/AbstractUsuario')

class Agente extends AbstractUsuario{}

Agente.init({
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    cnpj: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    tipo: {
        type: DataTypes.ENUM,
        allowNull: false
    },
    rendimentos: {
        type: DataTypes.ARRAY
    }
}, {
    sequelize,
    modelName: 'Agente',
    tableName: 'Carros',
    timestamps: false
})