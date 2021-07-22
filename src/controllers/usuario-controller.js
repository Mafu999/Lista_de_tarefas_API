//Recebendo requisições exportadas
const { response } = require("express")
const bd = require("../infra/sqlite-db")
const User = require("../models/userModel")
const userDao = require("../DAO/usuarios-DAO")
//exportando essa função usando uma callback
module.exports = (app, User, bd)=>{
  let dao = new userDao(bd)
  //get, vulgo read do CRUD. Significa que quando eu ler a rota "/usuario" ele irá me retornar o conteudo de usuario do bd. 
    /*app.get('/usuario', (req, res) => {
      res.send(bd.users)
    })*/  
    //post, vulgo create do CRUD, cria um usuário com seus atributos. 
    /*app.post('/usuario', (req, res)=>{
      //req.body está requisitando o "corpo" desse usuario.
      const {nome,email,senha} = req.body
      //usando o .push para inserir/criar um novo usuário
      bd.users.push(new User(nome,email,senha))
      bd.run(`insert into usuario values (?,?,?,?)`,param1,param2,param3,param4,param5,(err)=>{
        
      })
      //o send é tipo um "return da vida"
      res.send('Usuario adicionado ao BD')
    })*/
    //mostra o resultado das pesquisas em json, mostrano os results e a quantidaade (.length)
    /*app.get('/usuario', (req, res)=>{
      res.json({
        result:bd.users,
        count:bd.users.length
      })
    })*/
    //Criando uma rota (/usuario/:email) para consultar o email dos usuarios do bd, retornando um json completo do usuario
    app.get('/usuario/:email', (req, res)=>{
      let arrayResposta = bd.users.filter((element)=>{
        return element.email === req.params.email
      })
      res.json({
        result: arrayResposta,
        count: arrayResposta.length
      })
    })
//Deletando um usuário completo loclizando-o pelo e-mail
    app.delete('/usuario/:email', (req, res)=>{
      let parametroEmail = req.params.email
      dao.deleteFromEmail(parametroEmail)
      .then(()=>{
        res.status(200).json({
          message: `Usuario cujo email ${req.params.email} deletado`
        })
      })
      .catch((err)=>{
        res.status(500).json({
          err,
          message: "Erro na requisição"
        })
      })
    })

    app.put('/usuario/:nome', (req, res)=>{
      
      //checar qual campo quer alterar
      const emailRecebido = req.params.email
      const updateUser = req.body
      let contAtualizacao = 0
      
      //repetição para alterar o nome
      bd.users = bd.users.map((user)=>{
        if(user.email === emailRecebido){
          contAtualizacao++
          return updateUser
        }
        return user
      })
    })

//Usando o sqlite e não arrays
    app.get("/usuario", (req, res)=>{
      bd.all("select * from usuarios", (err, rows)=>{
        if(err){
          res.json({
            message: "Erro ao obter Users",
            error: true
          })
        } else{
          res.json({
            result: rows,
            count: rows.length
          })
        }
      })
    })
    //Inserindo dados
    app.post('/usuario', (req, res) =>{
      const {nome, email, senha} = req.body
      const createUser = new User(nome, email, senha)
      bd.run('INSERT INTO USUARIOS (nome, email, senha) VALUES (?,?,?)', createUser.nome, createUser.email, createUser.senha, (err)=>{
        if(err){
          res.json({
            error: erro
          })
        } else{
          res.json({
            message: "Usuário Criado"
          })
        }
      })
    })
}

