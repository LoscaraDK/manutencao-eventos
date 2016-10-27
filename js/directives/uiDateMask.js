//a chamada da diretiva é dada utilizando um - exemplo <ui-alert></ui-alert> <div ui-alert></div>
//so funciona em input type="text"
manutencaoEventosApp.directive('uiDateMask', function ($filter) {
    return {
        //propriedade require - Estabelece um vinculo com outra diretiva interagindo
        //por meio do controller, que é um dos parâmetros da funçAo
        //link
        require: "ngModel",
        //propriedade link - executada depois do template ter sido compilado,
        //podemos usar para interagir com a DOM,
        //tratando eventos ou mesmo para definir o comportamento
        //associado com a logica da diretiva.
        //scope - escopo do controlador
        //angular.element - permite fazer uma série de operaçoes com jqLite
        //attrs - nos permite acessar atributos do elemento ex: id,name,value etc
        //ctrl - nos permite acessar o controller defido na propriedade require.
        link: function (scope,element,attrs,ctrl) {
            var _formatDate = function (date) {
                date = date.replace(/[^0-9]+/g,"");
                if(date.length > 2){
                    date = date.substring(0,2) + "/" + date.substring(2);
                }
                if(date.length > 5){
                    date = date.substring(0,5) + "/" + date.substring(5,9);
                }
                return date;
            };

            element.bind("keyup",function(){
                ctrl.$setViewValue(_formatDate(ctrl.$viewValue));
                ctrl.$render();
            });

            ctrl.$parsers.push(function (value) {
				if (value.length === 10) {
					var dateArray = value.split("/");
					return new Date(dateArray[2], dateArray[1]-1, dateArray[0]).getTime();
				}
			});

			ctrl.$formatters.push(function (value) {
				return $filter("date")(value, "dd/MM/yyyy");
			});
        }
    };
});
