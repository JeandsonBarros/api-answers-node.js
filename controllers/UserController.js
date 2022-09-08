const UserService = require("../services/UserService");

class UserController {
    
    async apiInsert(req, res) {

        const { email, name, password } = req.body

        if (!email)
            res.status(422).json({ message: "E-mail é necessário." })

        if (!name)
            res.status(422).json({ message: "Nome é necessário." })

        if (!password)
            res.status(422).json({ message: "Senha é necessária." })

        const user = await UserService.insert(email, name, password);

        res.status(user.status).json(user.body);

    }

    async apiUpdate(req, res){
        const email = req.params['email'];
        const {newEmail, newName, newPassword, password } = req.body;

        console.log("Autenticado:", req.body['authenticated']);

        if (!password)
            res.status(422).json({ message: "Senha é necessária." });

        const user = await UserService.update(newEmail, newName, newPassword, email, password);

        res.status(user.status).json(user.body);
    }

    async apiDelete(req, res){

        const email = req.params['email'];
        const { password } = req.body;

        console.log("Autenticado:", req.body['authenticated']);

        if (!password)
            res.status(422).json({ message: "Senha é necessária." });

        const user = await UserService.delete(email, password);

        res.status(user.status).json(user.body);
    }

    async apiSelectOne(req, res){

        const email = req.body['authenticated']

        const user = await UserService.selectOne(email);

        res.status(user.status).json(user.body);
    }

    async apiLogin(req, res) {

        const { email, password } = req.body

        if (!email)
            res.status(422).json({ message: "E-mail é necessário." })

        if (!password)
            res.status(422).json({ message: "Senha é necessária." })

        const user = await UserService.login(email, password);

        res.status(user.status).json(user.body);

    }
}

module.exports = new UserController;