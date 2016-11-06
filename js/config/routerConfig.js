manutencaoEventosApp.config(function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/filter');
    $stateProvider

    .state('filter', {
        url: '/filter',
        templateUrl: 'partials/manutencao-eventos-filter.html',
        controller: 'manutencaoEventosCtrl'
    })
    
    .state('list', {
        url: '/list',
        templateUrl: 'partials/manutencao-eventos-list.html',
        controller: 'manutencaoEventosCtrl',
        resolve: {
            log: function($stateParams){
                console.log($stateParams);
            }
        },
        params: {
            nomeAgPagamento:null,
            codAgPagamento:null,
            nomeRegistrador:null,
            codRegistrador:null,
            sitIF:null,
            codIF:null,
            sitEvento:null,
            fromDate:null,
            toDate:null,
            squash: true
        }
    });
});