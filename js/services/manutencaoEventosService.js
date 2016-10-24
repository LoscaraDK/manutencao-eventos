//Utiliza a função construtora para retornar um objeto.
//Exemplo de função construtora
//var Pessoa = function (nome, idade) {
//        this.nome = nome;
//        this.idade = idade;
//};
//var carlos = new Pessoa("Maria",18);
//console.log(carlos);
//config.baseUrl -> o objeto é criado em manutencaoEventosValue
manutencaoEventosApp.service("tiposDeEventoServiceAPI",function ($http,config) {
   this.getTiposDeEventos = function () {
       return $http.get(config.baseUrl + "/manutencao-eventos/tiposDeEvento");
   };
});