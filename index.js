var     domain = require('domain')
    ,   random = require('random-ext')


function randomValue(){
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

module.exports = function(seneca, options, done){

    options.argsLength = options.argsLength || 8 // 8 arguments by default
    //options.actionsList = options.actionsList || ['all'] // all options by default
    options.testTime = parseInt(options.testTime) * 1000 || 10 * 1000 // 60 seconds default

    var self = this //don't trounce the seneca var, just in case
    var totalInterations = 0, totalErrors = 0, totalSuccess = 0


    function run(randomArgs, element){
        try{

            self.act(element.testAction, randomArgs, function(err){
                if(err){
                    totalErrors++
                } else {
                    totalSuccess++
                }
                totalInterations++
            })
        } catch(error){
            totalErrors++
            totalInterations++
        }

    }


    self.add({role: 'fuzztester', 'cmd' : 'fuzz'}, function(args, done){

        var allActions = []

        var runDomain = domain.create()

        runDomain.on('error', function(){
            totalErrors++
        })

        self.list().map(function(element){
            if(element.cmd !== 'fuzz'){
                allActions.push({testAction : element, errorCount : 0, successCount : 0, iterations : 0})
            }

        }) // use this to test both conditions


        self.log.info('Beginning Fuzz test for all listed actions')


        var startTime = new Date()
        self.log.info('Starting Fuzz test, running for: ', options.testTime / 1000, ' seconds.')
        // fuzz test here, forever, we'll clear the interval on the next run in
        while(new Date().valueOf() - startTime.valueOf() < options.testTime){
            for(var i = 0 ; i < allActions.length ; i++){

                // random stuff to head in to each action as arguments

                var argsCount = random.integer(options.argsLength,0)

                var choice = parseInt(Math.random() * 10) % 2
                    , randomArgs = null
                    , j
                if(choice > 1){
                    randomArgs = {}
                    for(j = 0; j < argsCount ; j++){
                        randomArgs[random.string(20,1)] = randomValue()
                    }
                } else {
                    randomArgs = []
                    for(j = 0; j < argsCount ; j++){
                        randomArgs.push(randomValue())
                    }
                }



                runDomain.run(function(){
                    run(randomArgs,allActions[i])
                })

            }

        }



        var results = {}
        // calc results here
        results.errorCount = totalErrors || 0
        results.iterations = totalInterations || 0
        results.successCount = totalSuccess || 0

        /// debugging
        self.log.debug('totals: ', totalInterations, ' e: ', totalErrors, ' s: ', totalSuccess)
        //clearInterval(loopInterval)
        self.log.info('Completed Fuzz test, returning results')
        done(null, results)
        // complete and return data here.


    })


     done(null,{name : 'fuzztester' })
}