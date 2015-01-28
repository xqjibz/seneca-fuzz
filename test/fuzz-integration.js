var     sinon       = require('sinon')
    ,   expect      = require('chai').expect
    // kill logging, the errors are a lot
    ,   seneca      = require('seneca')({ log : { map:[{plugin:'fuzztester', handler : function(){ var a= true}}]}})


// setup
seneca.use('../', {'testTime' : 1})

describe('fuzz test from seneca', function(){
    it('should return an object with the counts inside', function(done){
        seneca.act({role:'fuzztester', cmd:'fuzz'}, function(err, results){
            expect(err).to.be.null
            expect(results).to.be.an('object')
            expect(results.totalIterations).to.be.a('number')
            expect(results.totalErrors).to.be.a('number')
            expect(results.totalSuccess).to.be.a('number')
            expect(results.totalIterations).to.equal(results.totalErrors)
            expect(results.totalSuccess).to.equal(0)
            done()
        })
    })
})