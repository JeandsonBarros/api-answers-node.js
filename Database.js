
require('dotenv').config()
const Sequelize = require('sequelize');

//https://www.luiztools.com.br/post/tutorial-de-crud-com-node-js-sequelize-e-mysql/
//const sequelize = new Sequelize('suas_atividades', 'root', '', {dialect: 'mysql', host: 'localhost'});

//https://www.luiztools.com.br/post/tutorial-de-crud-com-node-js-sequelize-e-postgresql/
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {dialect: 'postgres', host: process.env.HOST});

module.exports = sequelize;