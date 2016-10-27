//restrict A restrita ao atributo, E restrita ao elemento, C restrita a classe e M restrita ao comentário
//a chamada da diretiva é dada utilizando um - exemplo <ui-alert></ui-alert> <div ui-alert></div>
//podemos usar {{$scope.$id para saber o escopo que esta sendo usado}}
manutencaoEventosApp.directive('uiAlert', function () {
    return {
        templateUrl: "partials/alert.html",
        replace: true,
        restrict: "AE",
        scope: {
            title: "@" //@ pode ser usado se o elemento da tag for igual ao nome utilizado
            //,message: "=" //se quisermos ter o two way databind usamos o sinal de =
        },
        transclude: true //encapsula elementos dentro de uma diretiva criando um scope não isolado. ex: <ui-alert>exemplo</ui-alert>.
                         //usar ng-transclude no template da diretiva <div class="ui-alert-message" ng-transclude>
    };
});
