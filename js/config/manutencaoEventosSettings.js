//o metodo config serve para modificar os valores iniciais de um provider. ele é chamado antes da instanciação da aplicação.
manutencaoEventosApp.config(function ($mdDateLocaleProvider,serialGeneratorProvider) {
    serialGeneratorProvider.setLength(50);
    console.log(serialGeneratorProvider.getLength());
    

    moment.updateLocale('pt-br', null);

    $mdDateLocaleProvider.months = moment.months();
    $mdDateLocaleProvider.shortMonths = moment.monthsShort();
    $mdDateLocaleProvider.days = moment.weekdays();
    $mdDateLocaleProvider.shortDays = moment.weekdaysShort();

    $mdDateLocaleProvider.formatDate = function (date) {
        return moment(date).format('DD/MM/YYYY');
    };
});