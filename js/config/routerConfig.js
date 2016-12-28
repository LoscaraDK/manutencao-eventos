manutencaoEventosApp.config(function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/filter');
    $stateProvider

    // .state('filter', {
    //     url: '/filter',
    //     templateUrl: 'partials/manutencao-eventos-filter.html',
    //     controller: 'meSearchCtrl',
    //     resolve: {
    //         situacoesEvento: function (meSearch) {
    //             console.log(meSearch.getSituacoesEvento());
    //             return meSearch.getSituacoesEvento();
    //         } ,
    //         situacoesInstrumentoFinanceiro: function (meSearch) {
    //             return meSearch.getSituacoesInstrumentoFinanceiro();
    //         } ,
    //         tiposIF: function (meSearch) {
    //             return meSearch.getTiposIF();
    //         } ,
    //         tiposEvento:function (meSearch) {
    //             return meSearch.getTiposEvento();
    //         } 
    //     },
    // })
    
    .state('filter', {
        url: '/filter',
        templateUrl: 'partials/manutencao-eventos-filter.html',
        controller: 'MeSearchCtrl',
        resolve: MeSearchCtrl.resolve
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