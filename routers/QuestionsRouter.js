const router = require("express").Router()
const QuestionController = require("../controllers/QuestionController")

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

router.get("/", QuestionController.apiSelectAll)

router.get("/by/user", checkToken, QuestionController.apiSelectByUser)

router.get("/find", QuestionController.apiSearch)

router.post("/", checkToken, QuestionController.apiInsert)

router.put("/:id", checkToken, QuestionController.apiUpdate)

router.get("/:id", QuestionController.apiSelect)

router.delete("/:id", checkToken, QuestionController.apiDelete)

module.exports = router;
