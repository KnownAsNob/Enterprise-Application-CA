var express = require("express");
var router = express.Router();

var bodyParser = require('body-parser')

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


const https = require('https');

//Validation
var database_module = require('../service_modules/database_module.js');
const { check, validationResult } = require('express-validator');

//API
var api_module = require('../service_modules/api_module.js');


//Homepage test response
/*router.post("/", function(req, res, next){ //Change to get
    
    console.log("Visited");
  
  //res.render('index', { title: 'Express' });
    
})*/


router.get("/too", function(req, res){
    
    const xhttp = new XMLHttpRequest();

    console.log("Made req");

    xhttp.onreadystatechange = function() {
        
        console.log(this.status);

        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           console.log("Gotcha");
           response = JSON.parse(xhttp.responseText); 

      
            res.send(response);
        }
    };
    xhttp.open("GET", "http://ws.audioscrobbler.com/2.0/?method=track.search&track=Believe&api_key=9a2e3bd04810f60b6f5e1907306e581e&format=json", true);
    xhttp.send(); 
})

//Check if session contains user login
router.post('/checkAuth', (req, res) => {

    if(req.session.loggedIn){
        res.send({loggedIn: "LOGGED_IN", user: {username: req.session.user.username, email: req.session.user.email}});
    } 
    
    else {
        res.send({loggedIn: "NOT_LOGGED_IN", user: {username: "", email: ""}});
    }
})

//router.post('/createAccount', [checkValidation, createProfile]);

//Validate input and create account
router.post('/createAccount', [
        check('username')
            .isAlphanumeric().withMessage('Username can only contain letters and numbers!'),
        check('email')
            .isEmail().withMessage('Email must be a valid form!'),
        check('password')
            .isLength({ min: 5, max: 10 }).withMessage('Password length is not correct!')
            .isAscii().withMessage('Passwords cannot contain special symbols!')
            //Check passwords match
            .custom((value, {req, loc, path} ) => {
                if (value !== req.body.password2) {
                    //Throw error if passwords do not match
                    throw new Error("Passwords must match!");
                } else {
                    return value;
                }
            })

    ], (req, res) => {
        //Check validation results and returns object is errors present
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
    }

    if(req.session.loggedIn){
        
        res.send({error: "true"});
    }
    
    console.log("User successfully validated. Adding to database...");

    //Hash password
    req.body.password = database_module.hashPassword(req.body.password);

    /*if(bcrypt.compareSync('somePassword', hash)) {
        // Passwords match
       } else {
        // Passwords don't match
       }*/
    
    //Create user in database
    database_module.createUser(req, res, {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    //Set session login information
    req.session.loggedIn = 1;
    req.session.user = {username: req.body.username, email: req.body.email };

    res.send({ username: req.body.username, email: req.body.email });
});

//Validate user search and get results
router.get('/search/:userSearch', function(req, res){
    console.log("Received search request for: " + req.params.userSearch);

    //Call API
    api_module.searchAPI(req.params.userSearch);

});

// ---------------------------------------------

//Get token
//api_module.tokenAPI();

/*const options = {
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

externalReq.end()*/


module.exports=router;






//http://ws.audioscrobbler.com/2.0/?method=track.search&track=Believe&api_key=9a2e3bd04810f60b6f5e1907306e581e&format=json
///2.0/?method=chart.gettoptracks&api_key=9a2e3bd04810f60b6f5e1907306e581e&format=json