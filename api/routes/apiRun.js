var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next){
    res.send("This is the homepage");
    res.send("API is running");
})

/*router.get("/too", function(req, res, next){
    //res.send("I got something");
    console.log(req.params);
    //res.send("I got user: " + req.params.username);
})*/

router.post('/too', (req, res) => {
    console.log(req.body);
    res.send(req.body);
  })

module.exports=router;