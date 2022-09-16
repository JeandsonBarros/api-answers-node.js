const express = require("express")
const app = express()
const database = require("./Database")
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use((req, res, next) => {

	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");

	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    
    //Quais cabeçalhos HTTP podem ser usados ​​durante a solicitação real.
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
    app.use(cors());
    next();
});

app.get("/", (req, res)=>{
    res.send("<h1 style='text-align: center;'> Bem vindo(a) a suas respostas <br> <a href='./api-docs'>Documentação</a></h1> ")
})

app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

const QuestionRouter = require("./routers/QuestionsRouter")
app.use("/questions", QuestionRouter)

const UserRouter = require("./routers/UserRouter")
app.use("/auth", UserRouter)

const AnswerRouter = require("./routers/SuggestedAnswersRouter")
app.use("/answers", AnswerRouter)

const LikeAnswerRouter = require("./routers/LikeAnswerRouter")
app.use("/like-answers", LikeAnswerRouter)

database.sync().then(() => {

    app.listen(process.env.PORT || 8080, () => {
        console.log("========================");
        console.log("| Escutando porta 8080  |");
        console.log("| http://localhost:8080 |");
        console.log("========================");
    });

}).catch(error => console.log(error))



