# About your questions powered by Node.js

## Description

### summary

API developed in Node.js and Express for platforms that aims to allow people to post questions and answers of activities and works.

### Documentation

Documentation with Swagger UI hosted on heroku: https://api-suas-questoes.herokuapp.com/api-docs/

You can also view the documentation on your machine via http://localhost:8080/api-docs/ after running the api locally.

## Execution

### Start project

`npm run dev` 
or 
`npm start`

### installation of dependencies

`npm install` 
or 
`npm install bcrypt cors dotenv express jsonwebtoken mysql2 nodemon pg sequelize swagger-ui-express`

### Database

The database used at the time of development was MySql, but PostgreSql can also be used, just pass the data about the Bank in the Database.js file.
Tables are created automatically by Sequelize.

## Functionalities

### Questions

- Save questions (authenticated only)
- Edit questions (authenticated only)
- List questions
- Delete questions (authenticated only)


### Suggested Answers

- Save answer suggestions (authenticated only)
- Edit answer suggestions (authenticated only)
- List questions
- Delete suggested answers (authenticated only)


### User

- Login
- User registration
- Get authenticated user data (authenticated only)
- Edit authenticated user data (authenticated only)
- Delete authenticated user (authenticated only)


### Like the answer suggestion

- Shows amount of likes of suggested answer
- Save a like on the answer suggestion for the question (authenticated only)
- Remove like left in user's answer suggestion (authenticated only)
- Check if the user left a like (authenticated only)

