let segurado = {
    nome: "João",
    funcao: function() {
        console.log(this.nome);
    }
}
segurado.funcao();  