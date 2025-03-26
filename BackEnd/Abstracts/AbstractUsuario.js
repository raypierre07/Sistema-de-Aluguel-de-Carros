const { Model, DataTypes } = require('sequelize');
const sequelize = require('Config/db.js');

class AbstractUsuario extends Model{}

AbstractUsuario.init({

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'AbstractUsuario',
    tableName: 'Usuario',
    timestamps: false
})