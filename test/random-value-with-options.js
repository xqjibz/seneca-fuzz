var randomOptions = {
        arrayMax : 8
    ,   integerMax : 6
    ,   floatMax : 7
    ,   arrayMin : 5
    ,   integerMin : 3
    ,   floatMin : 0.1
    ,   stringMin : 9
    ,   dateEnd : new Date(2012,3,14)
    ,   dateStart : new Date(1999,2,7,18,0,0)
    ,   stringMax : 42
    ,   objectMin : 3
    ,   objectMax : 4

}

var     randomValue = require('../lib/random-value')(randomOptions)
    ,   expect          = require('chai').expect

describe('randomValue() with options specified', function(){

    var returnValue

    it('should return a boolean', function(){
        returnValue = randomValue({'choice' : 0})
        expect(returnValue).to.be.a('boolean')
    })
    it('should return an array of boolean', function(){
        returnValue = randomValue({'choice' : 1})
        expect(returnValue).to.be.an('array')
        expect(returnValue).to.have.length.within(randomOptions.arrayMin, randomOptions.arrayMax)
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
        expect(returnValue).to.have.length.within(randomOptions.arrayMin, randomOptions.arrayMax)
        for(var i = 0 ; i < returnValue.length ; i++){
            expect(returnValue[i]).to.be.a('number')
            expect(returnValue[i]).to.be.within(randomOptions.integerMin, randomOptions.integerMax)
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
        expect(returnValue).to.have.length.within(randomOptions.arrayMin, randomOptions.arrayMax)
        for(var i = 0 ; i < returnValue.length ; i++){
            expect(returnValue[i]).to.be.a('number')
            expect(returnValue[i]).to.be.within(randomOptions.floatMin, randomOptions.floatMax)
        }
    })
    it('should return a date', function(){
        returnValue = randomValue({'choice' : 6})
        expect(returnValue).to.be.a('date')
        expect(returnValue.valueOf()).to.be.within(randomOptions.dateStart.valueOf(), randomOptions.dateEnd.valueOf())
    })
    it('should return an array of dates', function(){
        returnValue = randomValue({'choice' : 7})
        expect(returnValue).to.be.an('array')
        expect(returnValue).to.have.length.within(randomOptions.arrayMin, randomOptions.arrayMax)
        for(var i = 0 ; i < returnValue.length ; i++){
            expect(returnValue[i]).to.be.a('date')
            expect(returnValue[i].valueOf()).to.be.within(randomOptions.dateStart.valueOf(), randomOptions.dateEnd.valueOf())
        }
    })
    it('should return a string', function(){
        returnValue = randomValue({'choice' : 8})
        expect(returnValue).to.be.a('string')
        expect(returnValue).to.have.length.within(randomOptions.stringMin, randomOptions.stringMax)
    })
    it('should return an array of strings', function(){
        returnValue = randomValue({'choice' : 9})
        expect(returnValue).to.be.an('array')
        expect(returnValue).to.have.length.within(randomOptions.arrayMin, randomOptions.arrayMax)
        for(var i = 0 ; i < returnValue.length ; i++){
            expect(returnValue[i]).to.be.a('string')
            expect(returnValue[i]).to.have.length.within(randomOptions.stringMin, randomOptions.stringMax)
        }
    })
    it('should return an object', function(){
        returnValue = randomValue({'choice' : 10})
        expect(returnValue).to.be.a('object')
        expect(Object.keys(returnValue).length).to.be.within(randomOptions.objectMin, randomOptions.objectMax)
    })
    it('should return an array of objects', function(){
        returnValue = randomValue({'choice' : 11})
        expect(returnValue).to.be.an('array')
        expect(returnValue).to.have.length.within(randomOptions.arrayMin, randomOptions.arrayMax)
        for(var i = 0 ; i < returnValue.length ; i++){
            expect(returnValue[i]).to.be.a('object')
            expect(Object.keys(returnValue[i]).length).to.be.within(randomOptions.objectMin, randomOptions.objectMax)
        }
    })
})