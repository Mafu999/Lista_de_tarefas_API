//Construindo o usuário com uma class e constructor
class User{
    constructor(nome,email,senha){
        this.nome = nome;
        this.senha = senha;
        this.email= email;
    }
}

//Exportando
module.exports = User;

