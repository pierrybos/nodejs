// Vamos usar o módulo VM para compilar o input
// do usuário, lembre-se: evite o eval()
var vm = require('vm');
module.exports = function(calculo){
    // Vamos executar o código que fora passado
    // e retornar o seu resultado
    return vm.runInNewContext('(function(){ return ' + calculo + '})()');
};
