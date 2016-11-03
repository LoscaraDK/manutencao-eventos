//Provider é um tipo de servico configuravel, ele permite configurar os valores iniciais do serviço no metodo config.
//posso utilizar um serviço do tipo constant para configurar os valores iniciais do meu provider e centralizar em um unico local como em manutencaoEventosConfigConstant
manutencaoEventosApp.provider("serialGenerator",function (configLength) {
    console.log(configLength.defaultLength);
	var _length = configLength.defaultLength;
	
	this.getLength = function () {
		return _length;
	};

	this.setLength = function (length) {
		_length = length;
	};

	this.$get = function () {
		return {
			generate: function () {
				var serial = "";
				while(serial.length < _length) {
					serial += String.fromCharCode(Math.floor(Math.random() * 64) + 32);
				}
				return serial;
			}

		};
	};
});