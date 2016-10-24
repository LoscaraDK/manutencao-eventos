//exemplo de uso {{nome | name}} joao da silva - > Joao da Silva 
//Copiado do site do Rodrigo Branas
manutencaoEventosApp.filter("name", function () {
	return function (input) {
		var listaDeNomes = input.split(" ");
		//usa a função map de array para iterar os elementos e formatar os nomes.
		var listaDeNomesFormatada = listaDeNomes.map(function (nome) {
			if(nome.length <= 3) {
            			if(/(da|de|do|das|dos)/.test(nome)) return nome;
         		}
			return nome.charAt(0).toUpperCase() + nome.substring(1).toLowerCase();
		});
		//junta os nomes com espaço.
		return listaDeNomesFormatada.join(" ");
	};
});
