const LikeAnswerService = require("../services/LikeAnswerService")

class LikeAnswerController {
    async apiQuantitLike(req, res) {
        const answerId = req.params['answerId']

        const like = await LikeAnswerService.quantitLike(answerId)

        return res.status(like.status).json(like.body)
    }

    async apiAsLike(req, res) {

        const answerId = req.params['answerId']
        const user = req.body['user']

        const like = await LikeAnswerService.asLike(answerId, user)

        return res.status(like.status).json(like.body)

    }

    async apiInsert(req, res) {

        const { answerId } = req.params
        const { user } = req.body

        if (!answerId)
            return res.status(422).json({ message: "Id da resposta é necessário!" })

        const like = await LikeAnswerService.insert(answerId, user)

        return res.status(like.status).json(like.body)

    }

    async apiDelete(req, res) {

        const id = req.params['id']
        const user = req.body['user']

        const like = await LikeAnswerService.delete(id, user)

        return res.status(like.status).json(like.body)

    }
}

module.exports = new LikeAnswerController;