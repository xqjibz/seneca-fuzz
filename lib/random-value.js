var random = require('random-ext')

module.exports = function(){
    function _randomValue(){
        var choice = parseInt(Math.random() * 1400) % 14
        switch(choice){
            case 0:
                return random.boolean()
                break
            case 1:
                return random.booleanArray(random.integer(10))
                break
            case 2:
                return random.integer(random.integer(1000),0)
                break
            case 3:
                return random.integerArray(random.integer(10), random.integer(1000),0)
                break
            case 4:
                return random.float(1000, 0)
                break
            case 5:
                return random.floatArray(random.integer(20), 1000, 0)
                break
            case 6:
                return random.date(new Date())
                break
            case 7:
                return random.dateArray(random.integer(20), new Date())
                break
            case 8:
                return random.string(random.integer(20))
                break
            case 9:
                return random.stringArray(random.integer(20,1),random.integer(20))
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