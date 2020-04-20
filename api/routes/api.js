var express = require("express");
var router = express.Router();

var express = require("express");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const https = require('https');

//API
var api_module = require('../service_modules/api_module.js');

//Validate user search and get results
router.get('/search/:userSearch', function(req, res){
    console.log("Received search request for: " + req.params.userSearch);

    const xhttp = new XMLHttpRequest();

    console.log("Made req");

    xhttp.onreadystatechange = function() {
        
        console.log(this.status);

        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            console.log("Gotcha");
            response = JSON.parse(xhttp.responseText); 

            //console.log(response);
            res.send(response);
        }
    };
    xhttp.open("GET", "http://ws.audioscrobbler.com/2.0/?method=track.search&track=Believe&api_key=9a2e3bd04810f60b6f5e1907306e581e&format=json", true);
    xhttp.send();

    //Call API
    //api_module.searchAPI(req.params.userSearch);

});

module.exports=router;