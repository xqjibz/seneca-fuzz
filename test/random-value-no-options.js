var     randomValue = require('../lib/random-value')()
    ,   expect          = require('chai').expect

describe('randomValue() with default options', function(){

    var returnValue

    it('should return a boolean', function(){
        returnValue = randomValue({'choice' : 0})
        expect(returnValue).to.be.a('boolean')
    })
    it('should return an array of boolean', function(){
        returnValue = randomValue({'choice' : 1})
        expect(returnValue).to.be.an('array')
        expect(returnValue).not.to.have.length.above(20)
        for(var i = 0 ; i < returnValue.length ; i++){
            expect(returnValue[i]).to.be.a('boolean')
        }
    })
    it('should return an integer', function(){
        returnValue = randomValue({'choice' : 2})
        expect(returnValue).to.be.a('number')
        expect(returnValue).not.to.be.above(1000)
    })
    it('should return an array of integers', function(){
        returnValue = randomValue({'choice' : 3})
        expect(returnValue).to.be.an('array')
        expect(returnValue).not.to.have.length.above(20)
        for(var i = 0 ; i < returnValue.length ; i++){
            expect(returnValue[i]).to.be.a('number')
            expect(returnValue[i]).not.to.be.above(1000)
        }
    })
    it('should return an float', function(){
        returnValue = randomValue({'choice' : 4})
        expect(returnValue).to.be.a('number')
        expect(returnValue).not.to.be.above(1000)
    })
    it('should return an array of floats', function(){
        returnValue = randomValue({'choice' : 5})
        expect(returnValue).to.be.an('array')
        expect(returnValue).not.to.have.length.above(20)
        for(var i = 0 ; i < returnValue.length ; i++){
            expect(returnValue[i]).to.be.a('number')
            expect(returnValue[i]).not.to.be.above(1000)
        }
    })
    it('should return a date', function(){
        returnValue = randomValue({'choice' : 6})
        expect(returnValue).to.be.a('date')
        var now = new Date()
        expect(returnValue.valueOf()).not.to.be.above(now.valueOf())
    })
    it('should return an array of dates', function(){
        returnValue = randomValue({'choice' : 7})
        expect(returnValue).to.be.an('array')
        expect(returnValue).not.to.have.length.above(20)
        var now = new Date()
        for(var i = 0 ; i < returnValue.length ; i++){
            expect(returnValue[i]).to.be.a('date')
            expect(returnValue[i].valueOf()).not.to.be.above(now.valueOf())
        }
    })
    it('should return a string', function(){
        returnValue = randomValue({'choice' : 8})
        expect(returnValue).to.be.a('string')
        expect(returnValue).not.to.have.length.above(20)
    })
    it('should return an array of strings', function(){
        returnValue = randomValue({'choice' : 9})
        expect(returnValue).to.be.an('array')
        expect(returnValue).not.to.have.length.above(20)
        for(var i = 0 ; i < returnValue.length ; i++){
            expect(returnValue[i]).to.be.a('string')
            expect(returnValue[i]).not.to.have.length.above(20)
        }
    })
    it('should return an object', function(){
        returnValue = randomValue({'choice' : 10})
        expect(returnValue).to.be.a('object')
        expect(Object.keys(returnValue).length).not.to.be.above(8)
    })
    it('should return an array of objects', function(){
        returnValue = randomValue({'choice' : 11})
        expect(returnValue).to.be.an('array')
        expect(returnValue).not.to.have.length.above(20)
        for(var i = 0 ; i < returnValue.length ; i++){
            expect(returnValue[i]).to.be.a('object')
            expect(Object.keys(returnValue[i]).length).not.to.be.above(8)
        }
    })
})