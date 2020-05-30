const request = require('request');

var getSubmission=(handle,callback)=>{
    request({
        url:'https://codeforces.com/api/user.status?handle='+handle+'&from=1&count=30',
        json:true
    },(error,response,body)=>{
        if(error)
        {
           callback("Cannot connect to the codeforces server");
            
        }
       
        else{
        callback(undefined,{
            res:body.result
        });
        }
    
    })
}

module.exports.getSubmission=getSubmission
