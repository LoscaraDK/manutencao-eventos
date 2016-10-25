manutencaoEventosApp.controller('manutencaoEventosCtrl', function ($scope, $mdpDatePicker, $mdpTimePicker,eventosFactoryAPI,tiposDeEventoServiceAPI,serialGenerator) {
    console.log(serialGenerator.generate());
    $scope.eventos = [];

    $scope.tiposDeEventos = [];

    var carregarEventos = function () {
        eventosFactoryAPI.getEventos().success(function (data) {
            $scope.eventos = data;
        }).error(function(data,status){
            $scope.message = "Erro: " + data;
        });
    };

    var carregarTiposDeEventos = function () {
        tiposDeEventoServiceAPI.getTiposDeEventos().success(function (data) {
            $scope.tiposDeEventos = data;
        }).error(function(data,status){
            $scope.message = "Erro: " + data;
            console.log("Erro: " + data);
        });
    };

    $scope.addEvent = function (evento) {
        console.log(evento);
        eventosFactoryAPI.saveEvento(evento).success(function (data) {
            delete $scope.evento; //deleta o evento
            $scope.manutencaoEventosForm.$setPristine(); //reseta as mensagens de erro
            carregarEventos();
        }).error(function(data,status){
            $scope.message = "Erro: " + data;
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
            $scope.message = "Erro: " + data;
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