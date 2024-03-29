const Question = require("../models/Question");
const Sequelize = require('sequelize');
const User = require("../models/User");

class QuestionService {

    async selectAll(page) {
        try {

            if (page < 1 || !page) page = 1

            const limit = 10;
            const offset = limit * (page - 1);

            const count = await Question.count();

            const questions = await Question.findAll({ limit, offset });

            for (let c = 0; c < questions.length; c++) {

                const user = await User.findByPk(questions[c].user)
                questions[c].dataValues.user_name = user.name

            }

            return {
                status: 200,
                body: {
                    questions,
                    limit,
                    offset,
                    count,
                    page,
                    total_pages: Math.ceil(count / limit)
                }

            };

        } catch (error) {
            return { status: 500, body: { message: "Erro ao obter questões" } };
        }
    }

    async search(statement, page) {
        try {

            if (page < 1 || !page) page = 1

            const limit = 10;
            const offset = limit * (page - 1);

            const count = await Question.count({
                where: {
                    statement: {
                        [Sequelize.Op.like]: "%" + statement + "%"
                    }
                }
            });

            const questions = await Question.findAll({
                where: {
                    statement: {
                        [Sequelize.Op.like]: "%" + statement + "%"
                    }
                },
                limit, offset
            })

            for (let c = 0; c < questions.length; c++) {

                const user = await User.findByPk(questions[c].user)
                questions[c].dataValues.user_name = user.name

            }

            return {
                status: 200,
                body: {
                    questions,
                    limit,
                    offset,
                    count,
                    page,
                    total_pages: Math.ceil(count / limit)

                }
            };

        } catch (error) {
            return {
                status: 500, body: { message: "Erro ao buscar questões" }
            };
        }
    }

    async searchByUser(statement, page, user) {
        try {

            if (page < 1 || !page) page = 1

            const limit = 10;
            const offset = limit * (page - 1);

            const count = await Question.count({
                where: {
                    statement: {
                        [Sequelize.Op.like]: "%" + statement + "%"
                    },
                    user
                }
            });

            const questions = await Question.findAll({
                where: {
                    statement: {
                        [Sequelize.Op.like]: "%" + statement + "%"
                    },
                    user
                },
                limit, offset
            })

            for (let c = 0; c < questions.length; c++) {

                const user = await User.findByPk(questions[c].user)
                questions[c].dataValues.user_name = user.name

            }

            return {
                status: 200,
                body: {
                    questions,
                    limit,
                    offset,
                    count,
                    page,
                    total_pages: Math.ceil(count / limit)

                }
            };

        } catch (error) {
            return {
                status: 500, body: { message: "Erro ao buscar questões" }
            };
        }
    }

    async selectByUser(user, page) {
        try {

            if (page < 1 || !page) page = 1

            const limit = 10;
            const offset = limit * (page - 1);

            const count = await Question.count({ where: { user } })

            const questions = await Question.findAll({ where: { user }, limit, offset })

            for (let c = 0; c < questions.length; c++) {

                const userName = await User.findByPk(user)
                questions[c].dataValues.user_name = userName.name

            }

            return {
                status: 200,
                body: {
                    questions,
                    limit,
                    offset,
                    count,
                    page,
                    total_pages: Math.ceil(count / limit)
                }

            };

        } catch (error) {
            console.log(error);
            return { status: 500, body: { message: "Erro ao obter questões" } }
        }
    }

    async select(id) {
        try {

            const questionOne = await Question.findByPk(id);

            if (!questionOne)
                return { status: 404, body: { message: "Questão não encontrada" } }

            const user = await User.findByPk(questionOne.user)
            questionOne.dataValues.user_name = user.name

            return { status: 200, body: questionOne }


        } catch (error) {

            return { status: 500, body: { message: "Erro ao obter questão" } }

        }
    }

    async insert(question) {
        try {

            await Question.create(question);

            return { status: 201, body: { message: "Questão salva" } }

        } catch (error) {
            return { status: 500, body: { message: "Erro ao salvar questão" } }
        }
    }

    async update(question, id) {
        try {

            const asQuestion = await Question.findAll({
                where: {
                    user: question.user, id: id
                }
            })

            if (asQuestion.length === 0)
                return { status: 404, body: { message: "Questão não encontrada" } }

            const questionOne = await Question.findByPk(id)

            questionOne.matter = question.matter
            questionOne.statement = question.statement
            questionOne.answer = question.answer

            const resultadoSave = await questionOne.save();

            return { status: 200, body: { message: "Questão editada", question: resultadoSave } }

        } catch (error) {
            return { status: 500, body: { message: "Erro ao editar questão" } }

        }
    }

    async delete(id, user) {
        try {

            //const questionOne = await Question.findByPk(id);
            const questionOne = await Question.findAll({
                where: {
                    user, id
                }
            })

            if (questionOne.length === 0)
                return { status: 404, body: { message: "Questão não encontrada" } }

            await Question.destroy({ where: { id, user } });

            return { status: 200, body: { message: "Questão deletada" } }

        } catch (error) {
            return { status: 500, body: { message: "Erro ao deletar questão" } }

        }
    }



}

module.exports = new QuestionService;