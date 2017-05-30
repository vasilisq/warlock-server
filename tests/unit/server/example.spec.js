var chai = require('chai');
var expect = chai.expect;
var EntityManager = require('../../../server/core/entity-manager.js');

//просто для примера
describe('Chai js', function() {
    it('тесты работают', function() {
        expect(1).to.be.equal(1);
    });
});

describe('Entity Manager', function() {
    var obj = new EntityManager();

    before(function() {
        //console.log(obj, obj);
    });

    it('При инициализации dt ноль', function() {
        expect(obj.lastDt).to.equal(undefined);
    });

    it('Функция startTicking существует', function() {
        expect(obj.startTicking).not.to.be.undefined;
    });

});