const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

class Carro extends Model {}

Carro.init({
    matricula: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    ano: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            min: 1900,
            max: new Date().getFullYear() + 1
        }
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    placa: {
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: true,
        validate: {
            is: /^[A-Z]{3}-?\d[A-Z]\d{2}$/i
        }
    }
}, {
    sequelize,
    modelName: 'Carro',
    tableName: 'carro',
    timestamps: true,
    paranoid: true,
    hooks: {
        beforeValidate: (carro) => {

            if (carro.placa) {
                carro.placa = carro.placa.toUpperCase().replace(/-/g, '');
                if (carro.placa.length === 7) {
                    carro.placa = `${carro.placa.slice(0, 3)}-${carro.placa.slice(3)}`;
                }
            }
        }
    }
});


Carro.prototype.getDetalhes = function() {
    return {
        Matricula: this.matricula,
        Ano: this.ano,
        Marca: this.marca,
        Modelo: this.modelo,
        Placa: this.placa
    };
};


Carro.prototype.printDetalhes = function() {
    console.log(`Matricula: ${this.matricula}`);
    console.log(`Ano: ${this.ano}`);
    console.log(`Marca: ${this.marca}`);
    console.log(`Modelo: ${this.modelo}`);
    console.log(`Placa: ${this.placa}`);
};

module.exports = Carro;