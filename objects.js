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

function dec2bin(dec){
    return (dec >>> 0).toString(2);
  }

  console.log(dec2bin(1002));