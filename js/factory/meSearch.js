angular.module('manutencaoEventos').factory("meSearch", function ($http, config) {
    var _getSituacoesEvento = function () {
        return $http.get(config.baseUrl + "/manutencao-eventos/situacoesEvento").then(function (response) {
            return response.data;
        });
    };

    var _getSituacoesInstrumentoFinanceiro = function () {
        return $http.get(config.baseUrl + "/manutencao-eventos/situacoesIF").then(function (response) {
            return response.data;
        });
    };

    var _getTiposIF = function () {
        return $http.get(config.baseUrl + "/manutencao-eventos/tiposIF").then(function (response) {
            return response.data;
        });
    };

    var _getTiposEvento = function () {
        return $http.get(config.baseUrl + "/manutencao-eventos/tiposDeEvento").then(function (response) {
            return response.data;
        });
    };

    return {
        getSituacoesEvento: _getSituacoesEvento,
        getSituacoesInstrumentoFinanceiro: _getSituacoesInstrumentoFinanceiro,
        getTiposIF: _getTiposIF,
        getTiposEvento: _getTiposEvento
    };
});