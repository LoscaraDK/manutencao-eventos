//Factory sempre que invocada temos um objecto de retorno. Aqui injetamos $http para acessar os endereços. 
//Exemplo factory function
//var criarPessoa = function (nome, idade) {
//    return {
//        nome: nome,
//        idade: idade
//    };
//};
//var maria = criarPessoa("Maria",18);
//console.log(maria);

manutencaoEventosApp.factory("eventosFactoryAPI",function ($http,config) {
    var _getEventos = function () {
        return $http.get(config.baseUrl + "/manutencao-eventos/eventos");
    };

    var _saveEvento = function (evento) {
        return $http.post(config.baseUrl + "/manutencao-eventos/addEvent", evento);
    };

    var _removeEventos = function (eventos) {
        return $http.post(config.baseUrl + "/manutencao-eventos/removeEvents", eventos);
    };



    return {
        getEventos: _getEventos,
        saveEvento: _saveEvento,
        removeEventos: _removeEventos
    }
});