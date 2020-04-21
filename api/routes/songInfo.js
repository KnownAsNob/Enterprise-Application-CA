var express = require("express");
var router = express.Router();

var database_module = require('../service_modules/database_module.js');

router.get("/checkLibrary/:songID/:username", function(req, res, next){
    console.log("Searching library of " + req.params.username + " for song: " + req.params.songID);

    response = database_module.checkLibrary(req, res, {
        username: req.params.username,
        song: req.params.songID
    }).then(function(str){
        console.log(str);
        res.send(str);
    });
})

module.exports=router;