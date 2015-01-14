module.exports = function(options, done){

    options.argsLength = options.argsLength || 8 // 8 arguments by default
    //options.actionsList = options.actionsList || ['all'] // all options by default
    options.testTime = parseInt(options.testTime) * 1000 || 60 * 1000 // 60 seconds default

    var self = this //don't trounce the seneca var, just in case

    self.add({role: 'fuzztester', 'cmd' : 'fuzz'}, function(args, done){

        var allActions = []
        self.list().map(function(element){
            allActions.push({testAction : element, errorCount : 0, successCount : 0})
        }) // use this to test both conditions


        var loopIntervalActive = false
        var totalRun = 0

        self.log.info('Beginning Fuzz test for all listed actions')

        loopInterval = setInterval(function(){
            console.log('loop interval, ', loopIntervalActive)
            if(loopIntervalActive){
                console.log('Completed Fuzz test, returning results')
                var results = {}
                // calc results here

                /// debugging
                allActions.map(function(element){
                    console.log('action: ', element.testAction, ' error: ', element.errorCount, ' success (should be 0) : ', element.successCount)
                })
                clearInterval(loopInterval)
                done(null, results)
                // complete and return data here.
            } else {
                loopIntervalActive = true
                console.log('Starting Fuzz test, running for: ', options.testTime / 1000, ' seconds.')
                // fuzz test here, forever, we'll clear the interval on the next run in
                while(true){
                    for(var i = 0 ; i < allActions.length ; i++){
                        //generate
                        //
                        //
                        //
                        //
                        // random stuff to head in to each action as arguments
                        //console.log('running: ', allActions[i].testAction)
                        try{
                            self.act(allActions[i].testAction, function(err){
                                totalRun++
                                if(err){
                                    allActions[i].errorCount++
                                } else {
                                    allActions[i].successCount++
                                }
                            })
                        } catch(error){
                            allActions[i].errorCount++
                        }

                    }
                }

            }

        }, options.testTime)

    })


    return {name : 'fuzztester' }
}