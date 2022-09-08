const Sequelize = require('sequelize');
const database = require('../Database');

let answer = database.define('answer', {
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
        onDelete: 'CASCADE',
        allowNull: false,
    },

    questionId: {
        type: Sequelize.INTEGER,
        references: {
            model: "questions",
            key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false,
    },

    answer: {
        type: Sequelize.STRING,
        allowNull: false
    }

});

module.exports = answer;