var     sinon       = require('sinon')
    ,   expect      = require('chai').expect
    ,   seneca      = { 'util' : { 'deepextend' : sinon.stub() }}
    ,   done        = sinon.stub()
    ,   fuzztester  = require('../')(seneca, {}, done)

describe('fuzz tester plugin function', function(){
    it('should return the name of the plugin on instantiation', function(){
        var returnValue = fuzztester()
        expect(done.callCount).to.equal(1)
    })
})