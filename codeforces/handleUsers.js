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
            rating:body.result[0].rating,
            rank:body.result[0].rank
        });
        }
    
    })
}

module.exports.getUser=getUser