var     domain          = require('domain')
    ,   random          = require('random-ext')
    ,   randomValue     = require('./lib/random-value')()



module.exports = function(seneca, options, done){

    options.argsLength = options.argsLength || 8 // 8 arguments by default
    //options.actionsList = options.actionsList || ['all'] // all options by default
    options.testTime = parseInt(options.testTime) * 1000 || 10 * 1000 // 60 seconds default

    var self = this //don't trounce the seneca var, just in case
    var returnObject = {
            totalIterations : 0
        ,   totalErrors : 0
        ,   totalSuccess : 0
        }
    var run = require('./lib/run')(returnObject)





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

        /// debugging
        self.log.debug('totals: ', returnObject.totalInterations, ' e: ', returnObject.totalErrors, ' s: ', returnObject.totalSuccess)
        //clearInterval(loopInterval)
        self.log.info('Completed Fuzz test, returning results')
        done(null, returnObject)
        // complete and return data here.


    })


     done(null,{name : 'fuzztester' })
}