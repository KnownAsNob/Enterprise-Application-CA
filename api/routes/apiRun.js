var express = require("express");
var router = express.Router();
var accountModules = require('../service_modules/validate.js');

router.get("/", function(req, res, next){
    res.send("This is the homepage");
    res.send("API is running");
})

/*router.get("/too", function(req, res, next){
    //res.send("I got something");
    console.log(req.params);
    //res.send("I got user: " + req.params.username);
})*/

/*router.post('/createAccount', (req, res) => {
    console.log(req.body);
    res.send({ error: true});
  })

module.exports=router;*/

//router.post('/createAccount', [checkValidation, createProfile]);

router.post('/createAccount', [accountModules.sayHi, accountModules.showData]);


module.exports=router;