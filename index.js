var     domain          = require('domain')
    ,   random          = require('random-ext')


module.exports = function(seneca, inOptions, done){

    var defaultOptions = {
                argsLength  : 8
            ,   testTime    : 60
            ,   arrayMax : 20
            ,   arrayMin : 0
            ,   integerMin : 0
            ,   integerMax : 1000
            ,   floatMax : 1000
            ,   floatMin : 0
            ,   dateEnd : new Date()
            ,   dateStart : null
            ,   stringMax : 20
            ,   stringMin : 0
            ,   objectMax : 8
            ,   objectMin : 0
        }
        ,   self = this // to keep this in the proper context.
        ,   options = self.util.deepextend(defaultOptions, inOptions)
        ,   testTime = parseInt(options.testTime * 1000)
        ,   returnObject = {
                totalIterations : 0
            ,   totalErrors : 0
            ,   totalSuccess : 0
            }
        ,   run = require('./lib/run')(returnObject)
        ,   randomValue     = require('./lib/random-value')(options)

    self.add({role: 'fuzztester', 'cmd' : 'fuzz'}, function(args, done){

        var allActions = []

        var runDomain = domain.create() // use the domain here to catch throws from the async calls

        runDomain.on('error', function(){
            totalErrors++
        })

        // loop the actions from the list, so we have something to act on, filtering here if necessary
        self.list().map(function(element){
            if(element.cmd !== 'fuzz'){
                allActions.push({testAction : element})
            }

        })

        self.log.info('Beginning Fuzz test for all listed actions')

        var startTime = new Date()
        self.log.info('Starting Fuzz test, running for: ', testTime / 1000, ' seconds.')
        // do this for the time we specify in the options.
        while(new Date().valueOf() - startTime.valueOf() < testTime){
            for(var i = 0 ; i < allActions.length ; i++){

                // random stuff to head in to each action as arguments

                var     argsCount       = random.integer(options.argsLength,0)
                    ,   choice          = parseInt(Math.random() * 10) % 2
                    ,   randomArgs      = null
                    ,   j
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
                    run(randomArgs,allActions[i], self)
                })

            }

        }

        // debugging
        self.log.debug('totals: ', returnObject.totalInterations, ' e: ', returnObject.totalErrors, ' s: ', returnObject.totalSuccess)
        self.log.info('Completed Fuzz test, returning results')
        done(null, returnObject)

    })

    // this is for the seneca plugin framework, for logging.
    done(null,{name : 'fuzztester' })
}