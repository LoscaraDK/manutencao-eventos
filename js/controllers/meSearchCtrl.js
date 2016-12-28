
function MeSearchCtrl(  $scope,
                        _situacoesEvento,
                        _situacoesInstrumentoFinanceiro,
                        _tiposIF,
                        _tiposEvento){
                            console.log($scope);
                            console.log(_situacoesEvento);
    $scope.situacoesEvento = _situacoesEvento;
    $scope.situacoesInstrumentoFinanceiro = _situacoesInstrumentoFinanceiro;
    $scope.tiposIF = _tiposIF;
    $scope.tiposEvento = _tiposEvento;
}

MeSearchCtrl.$inject = ['$scope',
                        '_situacoesEvento',
                        '_situacoesInstrumentoFinanceiro',
                        '_tiposIF',
                        '_tiposEvento'
                        ];

MeSearchCtrl.resolve = {
        
        _situacoesEvento: [ 'meSearch', function(meSearch){
            return meSearch.getSituacoesEvento();
        }],
        _situacoesInstrumentoFinanceiro: [ 'meSearch', function(meSearch){
            return meSearch.getSituacoesInstrumentoFinanceiro();
        }],
        _tiposIF: [ 'meSearch', function(meSearch){
            return meSearch.getTiposIF();
        }],
        _tiposEvento: [ 'meSearch', function(meSearch){
            return meSearch.getTiposEvento();
        }]                         
}

angular.module('manutencaoEventos').controller('MeSearchCtrl', MeSearchCtrl);