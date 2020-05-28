const request = require('request');

var getUser=(handle,callback)=>{
    request({
        url:'https://codeforces.com/api/user.info?handles='+handle,
        json:true
    },(error,response,body)=>{
        if(error)
        {
           callback("Cannot connect to the codeforces server");
            
        }
       
        else{
        callback(undefined,{
            handle: body.result[0].handle,
            rating:body.result[0].rating,
            maxRating: body.result[0].maxRating,
            rank:body.result[0].rank,
            maxRank: body.result[0].maxRank,

        });
        }
    
    })
}

module.exports.getUser=getUser
