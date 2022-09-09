const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

class UserService {

    async insert(email, name, password) {

        try {
            const asUser = await User.findByPk(email);

            if (asUser)
                return { status: 401, body: { message: "Já existe um usuário cadastrado com esse e-mail." } };

            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            await User.create({ email: email, name: name, role: "USER", password: passwordHash })

            return { status: 201, body: { message: "Usuário cadastrado." } }

        } catch (error) {

            return { status: 500, body: { message: "Erro ao cadastrar usuário." } };
        }

    }

    async selectOne(email) {
        try {

            const user = await User.findByPk(email);

            if (!user)
                return { status: 404, body: { message: "Usuário não encontrado" } }

            return { status: 200, body: { user } }

        } catch (error) {
            return { status: 500, body: { message: "Erro ao achar usuário." } };
        }

    }

    async update(newEmail, newName, newPassword, email, password) {
        try {

            const user = await User.findByPk(email);

            if (!user)
                return { status: 404, body: { message: "Não existe um usuário cadastrado com esse e-mail." } };

            const checkPassword = await bcrypt.compare(password, user.password)

            if (!checkPassword)
                return { status: 203, body: { message: "Senha incorreta!" } }

            const salt = await bcrypt.genSalt(12)

            let userUpdate = {}

            newEmail && (userUpdate.email = newEmail);
            newName && (userUpdate.name = newName);
            newPassword && (userUpdate.password = await bcrypt.hash(newPassword, salt));

            //const userUpdate = await user.save();

            user.update(userUpdate, { where: { email } });

            return { status: 200, body: { message: "Usuário editado" } }

        } catch (error) {
            return { status: 500, body: { message: "Erro ao editar usuário." } }
        }
    }

    async delete(email, password) {
        try {

            const user = await User.findByPk(email);

            if (!user)
                return { status: 404, body: { message: "Não existe um usuário cadastrado com esse e-mail." } };

            const checkPassword = await bcrypt.compare(password, user.password)

            if (!checkPassword)
                return { status: 203, body: { message: "Senha incorreta!" } }

            await user.destroy({ where: { email } })

            return { status: 200, body: { message: "Usuário deletado!" } }

        } catch (error) {
            console.log(error);
            return { status: 500, body: { message: "Erro ao deletar usuário." } }
        }
    }

    async login(email, password) {
        try {
            const user = await User.findByPk(email);

            if (!user)
                return { status: 404, body: { message: "Usuário não encontrado" } }

            const checkPassword = await bcrypt.compare(password, user.password)


            if (!checkPassword)
                return { status: 203, body: { message: "Senha incorreta!" } }

            const secret = process.env.SECRET

            const token = jwt.sign(
                {
                    email,
                },
                secret/*,
                    {
                        expiresIn: 300 // expires in 5min
                    } */
            )

            return ({ status: 200, body: { token: token, message: "Logado" } })


        } catch (error) {

            return { status: 500, body: { message: "Erro logar." } };
        }
    }
}

module.exports = new UserService;