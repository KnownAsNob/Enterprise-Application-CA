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

/*if(req.session.page_views){
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times");
 } else {
    req.session.page_views = 1;
    res.send("Welcome to this page for the first time!");
 }*/

 //Homepage test response
router.get("/home", function(req, res, next){ //Change to get
    
    console.log("Visited homepage");
    console.log(req.session);

    if(req.session.loggedIn){
        //req.session.page_views++;
        res.send("You are logged in");
        //console.log("Yep, it's there...");
     } else {
        //req.session.loggedIn = 1;
        res.send("Not logged in");
       
     }

    //res.send("Homepage");
  
  //res.render('index', { title: 'Express' });
    
})

//Homepage test response
router.get("/login", function(req, res, next){ //Change to get
    
    console.log("Logged In");
    req.session.loggedIn = 1;
    console.log(req.session);

    res.send("Logged in");
  
  //res.render('index', { title: 'Express' });
    
})
