module.exports = function(options, done){

    options.argsLength = options.argsLength || 8 // 8 arguments by default
    //options.actionsList = options.actionsList || ['all'] // all options by default
    options.testTime = parseInt(options.testTime) * 1000 || 60 * 1000 // 60 seconds default

    var self = this //don't trounce the seneca var, just in case

    self.add({'test' : 'fuzz'}, function(done){

        var allActions = this.list() // use this to test both conditions


        var loopIntervalActive = false
        var totalRun = 0

        self.log.info('Starting Fuzz test, running for:', options.testTime)

        loopInterval = setInterval(function(){
            if(loopIntervalActive){
                self.log.info('Completed Fuzz test, returning results')
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
                // fuzz test here.
                for(var i = 0 ; i < allActions.length ; i++){
                    //generate random stuff to head in to each action as arguments
                    self.log.debug('running: ', allActions[i].testAction)
                    self.act(allActions[i].testAction, function(err){
                        totalRun++
                        if(err){
                            allActions[i].errorCount++
                        } else {
                            allActions[i].successCount++
                        }
                    })
                }
            }

        }, options.testTime)

    })


    return 'fuzztester'
}