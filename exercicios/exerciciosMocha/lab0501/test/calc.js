var assert = require('assert');
// E também vamos incluir a lib
// da calculador, que criaremos mais tarde
var calculadora = require('../lib/calculadora');
// Descrevemos um tópico inicial usando
// o método describe() do Mocha
describe('Testes gerais da calculadora', function(){
// Dentro do tópico criamos os testes relacionados
// aos mesmos, fazemos isso usando o método it()
it('A calculadora deve ser uma função', function(){
    // Usamos o assert.equal() para verificar se
    // o tipo da variável 'calculadora' realmente
    // é uma função
    assert.equal(typeof calculadora, 'function');
});
it('O cálculo 191 * 7 deve ser igual a 1337', function(){
    assert.equal(calculadora('191 * 7'), 1337);
});
});



/*var assert = require('assert');


describe('Alguns testes', function(){

	it('2 + 2 deve ser igual a 4  ', function(){
		assert.equal(4,2 + 2);
	});
	
	it('2 * 2 deve ser igual a 8  ', function(){
		assert.equal(8, 2 * 2);
	});

});*/