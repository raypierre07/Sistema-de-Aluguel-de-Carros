const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    dialect: 'mysql',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: false
});

sequelize.authenticate()
    .then(() => {
        console.log('Conectado ao banco de dados!');
    })
    .catch(err => {
        console.error('Erro ao conectar no banco de dados:', err);
    });

module.exports = sequelize;