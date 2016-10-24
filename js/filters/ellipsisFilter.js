//exemplo {{ name | ellipsis:10 }} ou {{ name | ellipsis }} size default = 2 -> Joao da Silva -> Jo..., se o tamanho for menor ou igual ao size retorna o nome. 
//Copiado do site do Rodrigo Branas
manutencaoEventosApp.filter("ellipsis", function () {
	return function (input, size) {
		if (input.length <= size) return input;
		var output = input.substring(0,(size || 2)) + "...";
		return output;
	};
});