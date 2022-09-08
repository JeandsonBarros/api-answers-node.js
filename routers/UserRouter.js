const router = require("express").Router();
const UserController = require("../controllers/UserController");
const jwt = require("jsonwebtoken");

async function checkToken(req, res, next) {

    try {

        const secret = process.env.SECRET;

        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(" ")[1]

        if (!token)
            return res.status(401).json({ message: "Acesso negado!" })

        const content = jwt.verify(token, secret);

        req.body['authenticated'] = content.email;

        next();

    } catch (error) {
        return res.status(400).json("Token inválido!")
    }
}

router.post("/register", UserController.apiInsert)
router.post("/login", UserController.apiLogin)
router.get("/user", checkToken, UserController.apiSelectOne)
router.put("/update/:email", checkToken, UserController.apiUpdate)
router.delete("/delete/:email", checkToken, UserController.apiDelete)



module.exports = router;