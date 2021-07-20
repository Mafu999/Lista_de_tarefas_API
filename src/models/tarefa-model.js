//Criando o escopo da tarefa
class Tarefa{
    constructor(titulo,descricao, status, dataCriacao){
        this.titulo = titulo;
        this.descricao = descricao;
        this.status = status;
        this.dataCriacao = dataCriacao;

    }
}

//Exportando-a e possui comentado abaixo um exemplo de criação da tarefa.
//console.log(new Tarefa('Resilia', 'descrição', 'off', '09/03/2000'))
module.exports = Tarefa;