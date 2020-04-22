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

router.post("/changeLibrary", function(req, res, next){
    console.log(req.body);
    console.log("Editing library of " + req.body.values.username + " for song: " + req.body.values.songID);
    console.log("Status: " + req.body.libraryStatus);

    console.log(req.session);

    response = database_module.editLibrary(req, res, {
        username: req.body.values.username,
        song: req.body.values.songID,
        status:  req.body.libraryStatus,
        songTitle: req.body.values.songTitle,
        songArtist: req.body.values.songArtist
    }).then(function(str){
        console.log(str);
        res.send(str);
    });
})

/* -------------- COMMENTS --------------- */

router.get("/:songID/comments", function(req, res, next){
    console.log("Fetching comments for song: " + req.params.songID);

    response = database_module.fetchComments(req, res, {
        songID: req.params.songID
    }).then(function(str){
        //console.log(str);
        res.send(str);
    });
})

router.post("/postcomment", function(req, res, next){
    console.log("Post comment reached");

    response = database_module.addComment(req, res)
    .then(function(str){
        //console.log(str);
        res.send(str);
    });
})

module.exports=router;