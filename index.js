module.exports = function(options, done){

    options.argsLength = options.argsLength || 8 // 8 arguments by default
    //options.actionsList = options.actionsList || ['all'] // all options by default
    options.testTime = parseInt(options.testTime) * 1000 || 10 * 1000 // 60 seconds default

    var self = this //don't trounce the seneca var, just in case

    function run(element, randomArgs, allActions, cb){
        self.act(allActions.testAction, randomArgs, function(err){
            if(err){
                allActions.errorCount++
            } else {
                allActions.successCount++
            }

        })
    }


    self.add({role: 'fuzztester', 'cmd' : 'fuzz'}, function(args, done){

        var allActions = []
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
                allActions[i].iterations++

                try{
                    run(i, {}, allActions[i])

                } catch(error){
                    allActions[i].errorCount++
                }

            }

        }


        console.log('Completed Fuzz test, returning results')
        var results = {}
        // calc results here

        /// debugging
        allActions.map(function(element){
            console.log('action: ', element.testAction, ' error: ', element.errorCount, ' success (should be 0) : ', element.successCount, ' iterations: ', element.iterations)
        })
        //clearInterval(loopInterval)
        done(null, results)
        // complete and return data here.


    })


    return {name : 'fuzztester' }
}