var     sinon       = require('sinon')
    ,   expect      = require('chai').expect
    ,   seneca      = { 'util' : { 'deepextend' : sinon.stub() }}

describe('fuzz tester plugin function', function(){
    it('should return the name of the plugin on instantiation', function(){
        seneca.util.deepextend()
        require('../').bind(seneca,{}, function(err, result){
            expect(result).to.equal({'name' : 'fuzztester'})
        })

    })

})