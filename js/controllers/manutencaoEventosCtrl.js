manutencaoEventosApp.controller('manutencaoEventosCtrl', function ($scope, $http, $mdpDatePicker, $mdpTimePicker) {
    //Scopes.store('manutencaoEventosCtrl', $scope);

    //console.log(Scopes.get('MainCtrl').criterioDate); 
    //$scope.app = 'Manutenção de Eventos'
    $scope.eventos = [];

    $scope.tiposDeEventos = [];

    var carregarEventos = function () {
        $http.get("/manutencao-eventos/eventos").success(function (data, status) {
            $scope.eventos = data;
        });
    };

    var carregarTiposDeEventos = function () {
        $http.get("/manutencao-eventos/tiposDeEvento").success(function (data, status) {
            $scope.tiposDeEventos = data;
        });
    };

    $scope.addEvent = function (evento) {
        console.log(evento);
        $http.post("/manutencao-eventos/addEvent", evento).success(function (data) {
            delete $scope.evento; //deleta o evento
            $scope.manutencaoEventosForm.$setPristine(); //reseta as mensagens de erro
            carregarEventos();
        });

        //$scope.eventos.push(evento); //adiciona o objeto no array

    };
    //retorna os eventos que não foram marcados para remoção utilizando filter
    $scope.removeEvents = function (eventos) {
        $scope.eventos =
            eventos.filter(function (evento) {
                if (!evento.isRemove) return evento;
            });

        $http.post("/manutencao-eventos/removeEvents", $scope.eventos).success(function (data) {
            $scope.manutencaoEventosForm.$setPristine(); //reseta as mensagens de erro
            carregarEventos();
        });
    };

    //Se existir algum evento para ser removido mostra o botão de apagar 
    $scope.isSelectedEvent = function (eventos) {
        return eventos.some(function (evento) {
            return evento.isRemove;
        });
    }
    $scope.orderBy = function (campo) {
        $scope.criteryOrder = campo;
        $scope.directionOrder = !$scope.directionOrder;
    };

    $scope.startDate = null;
    $scope.endDate = null;

    $scope.startDatePicker = function (ev) {
        $mdpDatePicker($scope.startDate, {
            targetEvent: ev
        }).then(function (selectedDate) {
            $scope.startDate = selectedDate;
        });;
    };

    $scope.endDatePicker = function (ev) {
        $mdpDatePicker($scope.endDate, {
            targetEvent: ev
        }).then(function (selectedDate) {
            $scope.endDate = selectedDate;
        });;
    };

    // $scope.filterDate = function(date) {
    // return moment(date).date() % 2 == 0;
    //};

    // $scope.showTimePicker = function(ev) {
    //    $mdpTimePicker($scope.currentTime, {
    //    targetEvent: ev
    // }).then(function(selectedDate) {
    //     $scope.currentTime = selectedDate;
    // });;
    //} ; 


    carregarEventos();
    carregarTiposDeEventos();


});