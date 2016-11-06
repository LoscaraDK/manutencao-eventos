manutencaoEventosApp.controller('manutencaoEventosCtrl', function ($scope, $mdpDatePicker, $mdpTimePicker,eventosFactoryAPI,tiposDeEventoServiceAPI,$state,$rootScope) {
    $scope.eventos = [];
    $scope.tiposDeEventos = [];
    $scope.fromDate = null;
    $scope.toDate = null;
    var carregarEventos = function () {
        eventosFactoryAPI.getEventos().success(function (data) {
            $scope.eventos = data;
        }).error(function(data,status){
            $scope.error = "Não foi possivel carregar os eventos - Erro: " + data;
        });
    };

    var carregarTiposDeEventos = function () {
        tiposDeEventoServiceAPI.getTiposDeEventos().success(function (data) {
            $scope.tiposDeEventos = data;
        }).error(function(data,status){
            $scope.error = "Não foi possivel carregar os tipos de eventos - Erro: " + data;
        });
    };

    $scope.addEvent = function (evento) {
        eventosFactoryAPI.saveEvento(evento).success(function (data) {
            delete $scope.evento; //deleta o evento
            $scope.manutencaoEventosForm.$setPristine(); //reseta as mensagens de erro
            carregarEventos();
        }).error(function(data,status){
            $scope.error = "Não foi possivel salvar o evento  -> Erro: " + data;
        });

        //$scope.eventos.push(evento); //adiciona o objeto no array

    };
    //retorna os eventos que não foram marcados para remoção utilizando filter
    $scope.removeEvents = function (eventos) {
        $scope.eventos =
            eventos.filter(function (evento) {
                if (!evento.isRemove) return evento;
            });

        eventosFactoryAPI.removeEventos($scope.eventos).success(function (data) {
            $scope.manutencaoEventosForm.$setPristine(); //reseta as mensagens de erro
            carregarEventos();
        }).error(function(data,status){
             $scope.error = "Não foi possivel remover os eventos  - Erro: " + data;
        });
    };

    //Se existir algum evento para ser removido mostra o botão de apagar 
    $scope.isSelectedEvent = function (eventos) {
        return eventos.some(function (evento) {
            return evento.isRemove;
        });
    };
    $scope.orderBy = function (campo) {
        $scope.criteryOrder = campo;
        $scope.directionOrder = !$scope.directionOrder;
    };

    $scope.goTo = function (state,value) {
        $state.go(state,value);
    };

    $rootScope.previous = undefined;
    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
        //assign the "from" parameter to something
        $rootScope.previous = from.name;
    });

    $rootScope.voltar = function(){
        $scope.goTo($rootScope.previous)
    };

    carregarEventos();
    carregarTiposDeEventos();


});