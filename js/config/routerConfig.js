manutencaoEventosApp.config(function ($stateProvider,$urlRouterProvider) {
    console.log('roteamento iniciadoaaaa');
    
    $urlRouterProvider.otherwise('/filter');
    $stateProvider

    .state('filter', {
        url: '/filter',
        templateUrl: 'partials/manutencao-eventos-filter.html',
        controller: 'manutencaoEventosCtrl'
    }).state('list', {
        url: '/list',
        templateUrl: 'partials/manutencao-eventos-list.html',
        controller: 'manutencaoEventosCtrl',
        resolve: {
            log: function(){
                console.log('entrou aqui');
            }
        }
    });
});