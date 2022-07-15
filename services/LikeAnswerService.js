const LikeAnswer = require("../models/LikeAnswer");
const User = require("../models/User");
const Question = require("../models/Question");
const Answers = require("../models/SuggestedAnswers");

class LikeAnswerServide {

    async quantitLike(answerId) {

        try {

            const answer = await Answers.findByPk(answerId)

            if (!answer)
                return { status: 404, body: { message: "Não existe uma sugestão de resposta com esse id." } }

            const likes = await LikeAnswer.findAll({ where: { answerId } })

            return { status: 200, body: { quantit_likes: likes.length } }

        } catch (error) {
            console.log(error);
            return { status: 500, body: { message: "Erro ao buscar quantidade de likes da sugestão de resposta." } }
        }
    }

    async selectByUser(user, page) {
        try {

            if (page < 1 || !page) page = 1

            const limit = 10;
            const offset = limit * (page - 1);

            const likes = await LikeAnswer.findAll({ where: { user }, limit, offset })
           
            const count = await LikeAnswer.count({ where: { user } })
            
            let answers = []

            for (let c = 0; c < likes.length; c++) {

                const answer = await Answers.findByPk(likes[c].answerId)
                const userAnswer = await User.findByPk(answer.user)
               
                answer.dataValues.user_name = userAnswer.name
                answers.push(answer)

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
            return { status: 500, body: { message: "Erro ao obter respostas." } }
        }
    }

    async asLike(answerId, user) {
        try {

            const answer = await Answers.findByPk(answerId)

            if (!answer)
                return { status: 404, body: { message: "Não existe uma sugestão de resposta com esse id." } }

            const likes = await LikeAnswer.findAll({ where: { answerId, user } })

            if (likes.length > 0) {
                return { status: 200, body: { message: "s" } }

            } else {
                return { status: 200, body: { message: "n" } }
            }

        } catch (error) {
            console.log(error);
            return { status: 500, body: { message: "Erro ao buscar like" } }
        }

    }

    async insert(answerId, user) {

        try {

            console.log(answerId, user);

            const answer = await Answers.findByPk(answerId);

            if (!answer)
                return { status: 404, body: { message: "Essa resposta não existe." } }

            const likes = await LikeAnswer.findAll({ where: { answerId, user } })

            if (likes.length > 0)
                return { status: 200, body: { message: "Você já deu like nessa resposta." } }


            await LikeAnswer.create({ answerId, user })

            return { status: 201, body: { message: "Like salvo" } }

        } catch (error) {
            console.log(error);
            return { status: 500, body: { message: "Erro ao salvar like" } }
        }
    }

    async delete(id, user) {
        try {

            const likes = await LikeAnswer.findAll({ where: { id, user } })

            if (likes.length == 0)
                return { status: 404, body: { message: "Like não encontrado" } }

            await LikeAnswer.destroy({ where: { id, user } })
            return { status: 200, body: { message: "Like removido" } }

        } catch (error) {
            console.log(error);
            return { status: 500, body: { message: "Erro ao deletar like" } }
        }
    }

}

module.exports = new LikeAnswerServide;