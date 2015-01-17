var     sinon   = require('sinon')
    ,   self    = { act : sinon.stub() }
    ,   run     = require('../lib/run')({})
    ,   expect  = require('chai').expect


describe('run()', function(){
    it('should call self.act 1 time', function(){
        var randomArgs = {}, element = {'testAction' : 'nonce'}
        run(element, randomArgs, self)
        expect(self.act.callCount).to.equal(1)
    })
})
