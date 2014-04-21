//
//watch task manager
//

//
//here is stored the match ids ,numbers
//
var queue = [];

//
//i use this url as in my project, it generates a lot of json
//example:      http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?key=EE4B46697AAE3B64E5E4334E10E7AB0F&match_id=123456789
//
var generateUrl =  function(match_id){
    return "http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?key=EE4B46697AAE3B64E5E4334E10E7AB0F&match_id=" + match_id;
};

var getMatches =  function(nrMatches, callback) {
    var match_ids = getNumberOfMatches(nrMatches);

    //parallel async call
    match_ids.forEach(function(match_id){
        var url = generateUrl(match_id);
        var get = Meteor.http.get(url, function(err, response){
            if(!err && !response.data.result.error){
                callback(null, response.data.result);
            }else{
                callback(err || response.data.result.error, match_id);
            }
        });
        // i even tried myself to free the memory
        url = get = null;
    });
    match_ids = null;
};

//shift a number of ids from queue
getNumberOfMatches = function(nr){
    var inQueue = queue.length;
    console.log("in queue are now: " + inQueue);
    if (nr > inQueue) {
        return queue.splice(0, nr);
    }
    else {
        return queue.splice(0, nr);
    }
};


var getAllMatches = function(){
    return queue;
};

var insertSampleData =  function(nr){
    var id = 123456789;
    for(var i = 0; i <= nr; i++){
        queue.push(id);
        id++;
    }
};


Meteor.setInterval(function(){
    getMatches(10, function(err, data){
       if(err){
           console.log("                " + data + "                  error");
       }else{
           console.log("                " + data.match_id + "                     ok");
       }
    });
}, 2000);


var cylce = 1;

Meteor.setInterval(function(){
    console.log("cycle: " + cylce);
    insertSampleData(49);
    cylce++;
}, 10000);