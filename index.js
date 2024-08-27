const express = require("express")

const db = require('./src/db')

const estoqueRouter = require('./src/routers/estoqueRouter')

//cria um aplicativo a partir do construtor do express
const app = express();

//sincronizar a conexão com o banco de dados
db.sync(()=>{
    console.log('DB conectado')
});


app.use(express.urlencoded({extended: true}));

app.use('/',estoqueRouter);

//declara uma porta e inicializa a execução do aplicativo na porta desejada
const port = 8080;

app.listen(port, ()=>{
    console.log(`app rodando na porta ${port}`);
})