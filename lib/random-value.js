var     random      = require('random-ext')
    ,   _           = require('underscore')

module.exports = function(inOptions){
    function _randomValue(objectArray){
        // here if we're doing an object array, lets not smash the call stack
        var     choice = objectArray ? parseInt(Math.random() * 1000) % 10 : parseInt(Math.random() * 1400) % 11
            ,   defaultOptions = {
                        arrayMax : 20
                    ,   arrayMin : 0
                    ,   integerMin : 0
                    ,   integerMax : 0
                    ,   floatMax : 1000
                    ,   floatMin : 0
                    ,   dateEnd : new Date()
                    ,   dateStart : null
                    ,   stringMax : 20
                    ,   stringMin : 0
                    ,   objectMax : 8
                    ,   objectMin : 0
                }
            ,   options = _.extend(defaultOptions, inOptions)
            ,   arrayLength = random.integer(options.arrayMax, options.arrayMin)
            ,   objectLength = random.integer(options.objectMax, options.objectMin)


        switch(choice){
            case 0:
                return random.boolean()
                break
            case 1:
                return random.booleanArray(arrayLength)
                break
            case 2:
                return random.integer(options.integerMax, options.integerMin)
                break
            case 3:
                return random.integerArray(arrayLength, options.integerMax, options.integerMin)
                break
            case 4:
                return random.float(options.floatMax, options.floatMin)
                break
            case 5:
                return random.floatArray(arrayLength, options.floatMax, options.floatMin)
                break
            case 6:
                return options.dateStart ? random.date(options.dateEnd, options.dateStart) : random.date(options.dateEnd)
                break
            case 7:
                return options.dateStart ? random.dateArray(arrayLength, options.dateEnd, options.dateStart) : random.dateArray(arrayLength, options.dateEnd)
                break
            case 8:
                return random.string(options.stringMax, options.stringMin)
                break
            case 9:
                return random.stringArray(arrayLength,options.stringMax, options.stringMin)
                break
            case 10:
                var returnObject = {}
                for(var i = 0 ; i < options.objectLength ; i++){
                    returnObject[random.string(options.stringMax, 1)] = _randomValue()
                }
                return returnObject
                break
            case 11:
                var returnObject = {}, returnArray = []
                for(var i = 0 ; i < options.arrayLength ; i++){
                    console.log(i, ' count in')
                    for(var j = 0 ; j < options.objectLength ; j++){
                        returnObject[random.string(options.stringMax, 1)] = _randomValue(true)
                    }
                    returnArray.push(returnObject)
                }
                return returnArray
                break
            default:
                return random.string(options.stringMax,options.stringMin)

        }
    }

    return _randomValue
}