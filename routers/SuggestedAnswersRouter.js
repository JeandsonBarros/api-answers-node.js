const router = require("express").Router()
const SuggestedAnswersController = require("../controllers/SuggestedAnswersController")
const jwt = require("jsonwebtoken");

async function checkToken(req, res, next) {

    try {

        const secret = process.env.SECRET;

        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(" ")[1]

        if(!token)
            return res.status(401).json({message: "Acesso negado!"})
        
        const content = jwt.verify(token, secret);

        req.body['user'] = content.email;

        next();

    } catch (error) {
        return res.status(400).json("Token inválido!")
    }
}

router.get("/:questionId", SuggestedAnswersController.apiSelectByQuestionId)
router.post("/:questionId", checkToken, SuggestedAnswersController.apiInsert)
router.put("/:questionId/:answerId", checkToken, SuggestedAnswersController.apiUpdate)
router.delete("/:questionId/:answerId", checkToken, SuggestedAnswersController.apiDelete)

module.exports = router;
