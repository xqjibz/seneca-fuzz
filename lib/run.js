module.exports = function(statsObject){
    function _run(randomArgs, element, self){
        try{

            self.act(element.testAction, randomArgs, function(err){
                if(err){
                    statsObject.totalErrors++
                } else {
                    statsObject.totalSuccess++
                }
                statsObject.totalIterations++
            })
        } catch(error){
            statsObject.totalErrors++
            statsObject.totalIterations++
        }

    }
    return _run
}