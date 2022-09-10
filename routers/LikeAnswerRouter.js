const LikeAnswerController = require("../controllers/LikeAnswerController")
const router = require("express").Router()
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

router.get("/", checkToken,  LikeAnswerController.apiSelectByUser)
router.get("/:answerId",  LikeAnswerController.apiQuantitLike)
router.post("/:answerId", checkToken, LikeAnswerController.apiInsert)
router.get("/as-like/:answerId", checkToken, LikeAnswerController.apiAsLike)
router.delete("/:answerId", checkToken, LikeAnswerController.apiDelete)

module.exports = router;