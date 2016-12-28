var manutencaoEventosApp = angular.module('manutencaoEventos', ["ngMaterial",
                                                                "ngAnimate",
                                                                "ngAria",
                                                                "ngMessages",
                                                                "mdPickers",
                                                                'ui.router']);

manutencaoEventosApp.run(function ($rootScope, $state) {
    console.log('rodando');
    $rootScope.goTo = function (state, value) {
        $state.go(state, value);
    };
    $rootScope.previous = undefined;
    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
        //assign the "from" parameter to something
        $rootScope.previous = from.name;
    });
    $rootScope.voltar = function(){
        $rootScope.goTo($rootScope.previous);
    };
});                                       