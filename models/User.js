const sequelize = require("sequelize");
const Database = require("../Database");

const User = Database.define("user",{
    email:{
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: sequelize.STRING,
        allowNull: false,
    },
    role:{
        type: sequelize.STRING,
        allowNull: false,
    },
    password:{
        type: sequelize.STRING,
        allowNull: false,
    }
});

module.exports = User;