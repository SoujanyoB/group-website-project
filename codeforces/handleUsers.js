const fetch = require('node-fetch');
const https = require('https');

getUser = (handle) => {
  var url = 'https://codeforces.com/api/user.info?handles=' + handle;
  console.log(url);

  https.get(url, (res) => {
    var body = '';

    res.on('data', (chunk) => {
      body+=chunk;
    })

    res.on('end', () => {
      var response = JSON.parse(body).result[0];
      // console.log(response);
      var responseObj = {
          contri: response.contribution,
          maxRank: response.maxRank
        }
      return responseObj;
    })
  }).on('error', (e) => {
    console.log(e);
  })
  
}

module.exports = getUser;