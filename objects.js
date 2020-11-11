let cliente = {
    nome: "João",
    funcao: function() {
        console.log(this.nome)
    }
}
class Cliente {
    constructor(nome, cpf, nascimento){
        this.nome = nome;
        this.cpf = cpf;
        this.nascimento = nascimento;
    }
}

let cliente1 = new Cliente("João Augusto", "525.856.952-22", "25/03/1990");
let cliente2 = new Cliente("João Augusta", "525.856.952-22", "25/03/1990");
console.log(cliente1);
console.log(cliente2);