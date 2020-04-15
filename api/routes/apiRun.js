var express = require("express");
var router = express.Router();

//Validation
var database_module = require('../service_modules/database_module.js');
const { check, validationResult } = require('express-validator');


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

//router.post('/createAccount', [accountModules.validateRegInput]);

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
  });
  

module.exports=router;