const bd = require("../infra/sqlite-db.js")
const Tarefa = require('../models/tarefa-model')

//Diferente do modelo de exportação da model, aqui criamos uma callback dentro do module, já que provavelmente não irei usar essa função de novo
module.exports = (app, Tarefa, bd)=>{
  /*app.get('/tarefa', (req, res) => {
    res.send(bd.task)
  })*/
  app.post('/tarefa', (req, res)=>{
    const {titulo,descricao,status,dataCriacao} = req.body
    bd.task.push(new Tarefa(titulo, descricao, status, dataCriacao))

    res.send('Tarefa add ao banco de dados')
  })
  //mostra o resultado das pesquisas em json, mostrano os results e a quantidaade (.length)
  /*app.get('/tarefa', (req, res)=>{
    res.json({
      result:bd.task,
      count:bd.task.length
    })
  })*/

      //Criando uma rota (/usuario/:titulo) para consultar o titulo da nova tarefa que está armazenada no bd, retornando um json completo do usuario
  /*app.get('/tarefa/:titulo', (req, res)=>{
    let arrayRespostaTarefa = bd.task.filter((element)=>{
      return element.titulo === req.params.titulo
    })
    res.json({
      result: arrayRespostaTarefa,
      count: arrayRespostaTarefa.length
    })
  })*/

//Deletando uma tarefa completo loclizando-a pelo titulo
  app.delete('/tarefa/:titulo', (req, res)=>{
    let parametroTitulo = req.params.titulo
    bd.task = bd.task.filter((item)=>{
      return item.titulo !== parametroTitulo
    })
    res.send('Tarefa excluída. 😉')
  })



  app.get("/tarefa", (req, res)=>{
    bd.all("select * from tarefas", (err, rows)=>{
      if(err){
        res.json({
          message: "Erro ao obter Tarefas",
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

}








  