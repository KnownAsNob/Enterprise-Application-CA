//const mysql = require('mysql');
const https = require('https');

//Application name 	Thoughtify
//API key 	9a2e3bd04810f60b6f5e1907306e581e
//Shared secret 	5f690f3ed78cf52ac07b0b0ecfa1c7a7
//Registered to 	KnownAsNob

//Make the token request
exports.tokenAPI = function () { 

    console.log("Module recieved token request");

    //Call options
    const options = {
        hostname: 'accounts.spotify.com',
        path: '/authorize?client_id=075d2f813254444499140a850126b105&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fsearch%2F%20',
        method: 'GET',
        //body: { },
        
      }
    
    console.log("Making req...");
    
    //Make request
    const externalReq = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            process.stdout.write(d)
        })
    })

    externalReq.on('error', error => {
        console.error(error)
    })

    externalReq.end()
    
}


exports.searchAPI = function (userReq) { 

    console.log("Received search request in module for: " + userReq);

    //Make the request
    
    

}



