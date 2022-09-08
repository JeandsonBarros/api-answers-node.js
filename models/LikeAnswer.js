const Sequelize = require('sequelize');
const database = require('../Database');

const LikeSuggestionAnswer = database.define('like_suggestion_answer', {

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

    answerId: {
        type: Sequelize.INTEGER,
        references: {
            model: "answers",
            key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false,
    }

});

module.exports = LikeSuggestionAnswer;