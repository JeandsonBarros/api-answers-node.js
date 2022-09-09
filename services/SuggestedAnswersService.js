const Answers = require("../models/SuggestedAnswers");
const Question = require("../models/Question");
const User = require("../models/User");

class SuggestedAnswers {

    async select(questionId, page) {
        try {

            const questionOne = await Question.findByPk(questionId);

            if (!questionOne)
                return { status: 404, body: { message: "Não existe uma questão com esse id" } }


            if (page < 1 || !page) page = 1

            const limit = 10;
            const offset = limit * (page - 1);

            const count = await Answers.count({ where: { questionId } });

            const answers = await Answers.findAll({ where: { questionId }, limit, offset });

            for (let c = 0; c < answers.length; c++) {

                const userName = await User.findByPk(answers[c].user)
                answers[c].dataValues.user_name = userName.name

            }

            return {
                status: 200,
                body: {
                    answers,
                    limit,
                    offset,
                    count,
                    page
                }
            }

        } catch (error) {
            console.log(error);
            return {
                status: 500,
                body: {
                    message: "Error ao buscar respostas."
                }
            }
        }
    }

    async selectByUser(user, page) {
        try {

            if (page < 1 || !page) page = 1

            const limit = 10;
            const offset = limit * (page - 1);

            const count = await Answers.count({ where: { user } })

            const answers = await Answers.findAll({ where: { user } })

            for (let c = 0; c < answers.length; c++) {

                const userName = await User.findByPk(user)
                answers[c].dataValues.user_name = userName.name

            }

            return {
                status: 200,
                body: {
                    answers,
                    limit,
                    offset,
                    count,
                    page
                }

            };

        } catch (error) {
            console.log(error);
            return { status: 500, body: { message: "Erro ao obter respostas" } }
        }
    }

    async apiSelectOneByUser(user, questionId) {
        try {

            const answerOne = await Answers.findAll({
                where: {
                    user: user, questionId: questionId
                }
            })

            if (answerOne.length == 0)
                return { status: 404, body: { message: "Sugestão de resposta não encontrada." } }

            return {
                status: 200,
                body: answerOne[0] 
            }



        } catch (error) {
            console.log(error);
        }
    }

    async insert(questionId, user, answer) {
        try {

            const answerOne = await Answers.findAll({
                where: {
                    user: user, questionId: questionId
                }
            })

            if (answerOne.length > 0)
                return { status: 401, body: { message: "Você já deixou uma sugestão de resposta nessa questão." } }

            await Answers.create({ questionId, user, answer })

            return {
                status: 201,
                body: {
                    message: "Resposta salva",
                    answer: {
                        questionId,
                        user,
                        answer
                    }
                }
            }

        } catch (error) {
            console.log(error);
            return {
                status: 500,
                body: {
                    message: "Erro ao salvar respostas."
                }
            }
        }
    }

    async update(id, questionId, user, answer) {
        try {

            const answerOne = await Answers.findAll({
                where: {
                    user, id, questionId
                }
            })

            if (answerOne.length === 0)
                return { status: 404, body: { message: "Resposta não encontrada" } }

            await Answers.update({ answer }, { where: { user, id, questionId } });

            return {
                status: 200,
                body: {
                    message: "Resposta salva",
                    answer: answer
                }
            }


        } catch (error) {
            console.log(error);
            return {
                status: 500,
                body: {
                    message: "Erro ao editar resposta."
                }
            }
        }
    }

    async delete(id, user, questionId) {
        try {

            const answerOne = await Answers.findAll({
                where: {
                    user: user, id: id, questionId: questionId
                }
            })

            if (answerOne.length === 0)
                return { status: 404, body: { message: "Resposta não encontrada" } }

            await Answers.destroy({ where: { user, id, questionId } });

            return { status: 200, body: { message: "Resposta deletada" } }

        } catch (error) {
            console.log(error);
            return {
                status: 500,
                body: {
                    message: "Erro ao deletar resposta."
                }
            }
        }
    }

}

module.exports = new SuggestedAnswers;