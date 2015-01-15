var domain = require('domain')
module.exports = function(options, done){

    options.argsLength = options.argsLength || 8 // 8 arguments by default
    //options.actionsList = options.actionsList || ['all'] // all options by default
    options.testTime = parseInt(options.testTime) * 1000 || 10 * 1000 // 60 seconds default

    var self = this //don't trounce the seneca var, just in case
    var totalInterations = 0, totalErrors = 0, totalSuccess = 0


    function run(iterator, randomArgs, element, cb){
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
        console.log('Starting Fuzz test, running for: ', options.testTime / 1000, ' seconds.')
        // fuzz test here, forever, we'll clear the interval on the next run in
        while(new Date().valueOf() - startTime.valueOf() < options.testTime){
            for(var i = 0 ; i < allActions.length ; i++){

                //generate
                //
                //
                //
                //
                // random stuff to head in to each action as arguments
                //console.log('running: ', allActions[i])
                //allActions[i].iterations++

                runDomain.run(function(){
                    run(i,{},allActions[i])
                })

            }

        }


        console.log('Completed Fuzz test, returning results')
        var results = {}
        // calc results here

        /// debugging
        console.log('totals: ', totalInterations, ' e: ', totalErrors, ' s: ', totalSuccess)
        //clearInterval(loopInterval)
        done(null, results)
        // complete and return data here.


    })


    return {name : 'fuzztester' }
}