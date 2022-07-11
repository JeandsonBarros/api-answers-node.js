const SuggestedAnswersService = require("../services/SuggestedAnswersService");

class SuggestedAnswersController {

    async apiSelectByQuestionId(req, res) {

        const page = parseInt(req.query['page'])

        const questionId = req.params['questionId'];

        const answers = await SuggestedAnswersService.select(questionId, page);

        res.status(answers.status).json(answers.body);

    }

    async apiInsert(req, res) {

        const questionId = req.params['questionId'];

        const { user, answer } = req.body;

        if (!answer)
            return res.status(422).json({ message: "Resposta é necessária!" })

        const answers = await SuggestedAnswersService.insert(questionId, user, answer);

        res.status(answers.status).json(answers.body);

    }

    async apiUpdate(req, res) {

        const questionId = req.params['questionId'];

        const answerId = req.params['answerId'];

        const { user, answer } = req.body;

        if (!answer)
            return res.status(422).json({ message: "Resposta é necessária!" })

        const answers = await SuggestedAnswersService.update(answerId, questionId, user, answer);

        res.status(answers.status).json(answers.body);

    }

    async apiDelete(req, res) {

        const questionId = req.params['questionId'];

        const answerId = req.params['answerId'];

        const user = req.body['user'];

        const answers = await SuggestedAnswersService.delete( answerId, user, questionId);

        res.status(answers.status).json(answers.body);

    }

}

module.exports = new SuggestedAnswersController;