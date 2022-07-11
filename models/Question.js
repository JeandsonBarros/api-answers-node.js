const Sequelize = require('sequelize');
const database = require('../Database');

const Question = database.define('question', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    user: {
        type: Sequelize.STRING,
        references: {
            model: "users",
            key: 'email'
        },
        allowNull: false,
    },

    matter: {
        type: Sequelize.STRING,
        allowNull: false
    },

    statement: {
        type: Sequelize.STRING,
        allowNull: false
    },

    answer: Sequelize.STRING
})

module.exports = Question;