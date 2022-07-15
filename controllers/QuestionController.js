const QuestionService = require("../services/QuestionService");

class QuestionController {

    async apiSelectAll(req, res) {

        const page = parseInt(req.query['page'])

        const questions = await QuestionService.selectAll(page);

        res.status(questions.status).json(questions.body);
    }

    async apiSelectByUser(req, res) {

        const page = parseInt(req.query['page'])
        let { user } = req.body;

        const questions = await QuestionService.selectByUser(user, page);

        res.status(questions.status).json(questions.body);
    }

    async apiSearch(req, res) {

        const page = parseInt(req.query['page'])
        const statement = req.query['statement']
        const questions = await QuestionService.search(statement, page);

        res.status(questions.status).json(questions.body);
    }

    async apiSelect(req, res) {

        const id = req.params['id'];

        const questions = await QuestionService.select(id);

        res.status(questions.status).json(questions.body);
    }

    async apiInsert(req, res) {

        let { matter, statement, answer, user } = req.body;

        if (!statement)
            return res.status(422).json({ message: "Enunciado da questão é necessário" });

        if (!matter)
            return res.status(422).json({ message: "Matéria da questão é necessária" });

        if (!answer)
            answer = "";

        const question = await QuestionService.insert({ matter, statement, answer, user });

        res.status(question.status).json(question.body);

    }

    async apiUpdate(req, res) {

        const user = req.body['user']

        const id = req.params['id'];
        let { matter, statement, answer } = req.body;

        if (!statement)
            return res.status(422).json({ message: "Enunciado da questão é necessário" });

        if (!matter)
            return res.status(422).json({ message: "Matéria da questão é necessária" });

        if (!answer)
            answer = "";

        const question = await QuestionService.update({ matter, statement, answer, user }, id);

        res.status(question.status).json(question.body);
    }

    async apiDelete(req, res) {

        const user = req.body['user']

        const id = req.params['id'];

        const question = await QuestionService.delete(id, user);

        res.status(question.status).json(question.body);

    }
}

module.exports = new QuestionController;