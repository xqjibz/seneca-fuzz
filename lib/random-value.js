var random = require('random-ext')

module.exports = function(options){
    function _randomValue(){
        var     choice = parseInt(Math.random() * 1400) % 14
            ,   options = options || {
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
            ,   arrayLength = random.integer(options.arrayMax, options.arrayMin)
            ,   randomInt = random.integer(options.integerMax, options.integerMin)

        switch(choice){
            case 0:
                return random.boolean()
                break
            case 1:
                return random.booleanArray(arrayLength)
                break
            case 2:
                return randomInt
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
                return true //random.object()
                break
            case 11:
                return false //random.objectArray()
                break
            default:
                return random.string(20,1)

        }
    }

    return _randomValue
}