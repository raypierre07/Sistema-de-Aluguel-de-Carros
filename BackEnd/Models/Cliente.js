const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Config/db');
const AbstractUsuario = require('../Abstracts/AbstractUsuario')

class Cliente extends AbstractUsuario {}

Cliente.init({
    rg: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cpf: {
        type: DataTypes.STRING(14),
        allowNull: false,
        unique: true
    },
    endereco: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    profissao: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Cliente',
    tableName: 'cliente',
    timestamps: false
});

module.exports = Cliente