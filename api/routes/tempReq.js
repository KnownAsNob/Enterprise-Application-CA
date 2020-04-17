/*
//Validate user search and get results
router.get('/search/:userSearch', function(req, res){
    console.log("Received search request for: " + req.params.userSearch);

    //Call API
    api_module.searchAPI(req.params.userSearch);

});

// ---------------------------------------------

const options = {
    hostname: 'api.spotify.com',
    path: '/v1/search?q=Muse&type=track%2Cartist&market=US&limit=10&offset=5',
    method: 'GET',
    headers: {
      
      'Authorization': 'Bearer BQC3tnSxO10lEL-P34uR6kws1tM5ftnc0tKS_6gH13TNuTwg-EZ5OCdz8usnaDdJ5Hxp4dtMVtFCf0crKrNgiAAqtXPxKJmZqPpMqAe_YJz739nlfgCyb80BHTaiCziSlbL57nF8TRF_RZrime1K85szKonkmlqlPX4'
    }
  }

  console.log("Making req...");

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

module.exports=router;*/