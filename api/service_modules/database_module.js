const mysql = require('mysql');

const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.validateRegInput = function (req, res, next) { 

    if(req.body.username == "asd")
    {
        res.send({ error: true });
    }

    else
    {
        next();
    }
}

//Create user in database
exports.createUser = function (req, res, user) { 

    //Create connection
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "220368",
        database: "world"
    });

    //On connection
    con.connect(function(err) 
    {
        if (err) throw err;
        
        console.log("Connected!");

        con.query("INSERT INTO users (username, email, password) VALUES (" + mysql.escape(user.username) + ", " + mysql.escape(user.email) + "," + mysql.escape(user.password) + "); ", function (err, result, fields) {    
            
            if (err) throw err;

        });

        //Sends all queries, send quit packet and quits gracefully
        con.end((err) => {
        
            if (err) throw err;

        });
    }); 
    
    res.send({ username: user.username });

} //End create user

//Hash password
exports.hashPassword = function (password) { 

    return(bcrypt.hashSync(password, saltRounds));

}

