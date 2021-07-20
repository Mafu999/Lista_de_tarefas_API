//Recebendo Requisições exportadas
const express = require('express')
const app = express()
const port = 4020
const tarefa = require('./controllers/tarefa-controller')
const usuario = require('./controllers/usuario-controller')
const User = require('./models/userModel')
const Tarefa = require('./models/tarefa-model')
const bd = require('./infra/sqlite-db')
//Transformando o conteúdo em json para manipular como objeto. Tem que estar abaixo das requisições
app.use(express.json())

//Chamando as funções que foram exportadas com as requisições
tarefa(app, Tarefa, bd)
usuario(app, User, bd)


/*app.use((req, res, next)=>{
  console.log('opa')
  next()

})//Usar somente se precisar fzer algo no meio, middleware. Manipular a requisição antes de atingir as rotas
*/



//Listen tem que ser a ultima coisa do código.
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })