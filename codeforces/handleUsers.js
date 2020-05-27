const fetch = require('node-fetch');
const https = require('https');

let dataObj ={}

function getUser(handle, callback) {
  var url = 'https://codeforces.com/api/user.info?handles=' + handle;
  // console.log(url);

  fetch(url)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      console.log(data);
      if(data!=null) {
        dataObj = data;
        callback(dataObj);
      }
    })

}
  


module.exports.getUser = getUser;