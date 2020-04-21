const mysql = require('mysql');

const bcrypt = require('bcrypt');
const saltRounds = 10;


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

    //req.session.loggedIn = true;
    //req.session.user = {username: user.username, email: user.email };

    //res.send({ username: user.username, email: user.email });

} //End create user

//Validate user in database
exports.authenticateUser = function (req, res, user) {
    return new Promise(function(resolve, reject){
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
            
            console.log("[AUTHENTICATE] Connected to database!");

            con.query("SELECT username, email, password FROM users WHERE username = " + mysql.escape(user.username) + ";", function (err, result, fields) {    
                
                if (err)
                {
                    //throw(err);
                    resolve({errors: "Those details do not match anything we have!"});
                };

                if(!result[0])
                {
                    console.log("Error");
                    resolve({errors: "Those details do not match anything we have!"});
                    return;
                }

                console.log("Result missing: " + result);

                console.log("Fetched user: " + result[0].username);
                
                if(bcrypt.compareSync(user.password, result[0].password)) {
                        resolve({usernname: result[0], email: result[0].email});
                        
                        //Set session login information
                        req.session.loggedIn = 1;
                        req.session.user = {username: req.body.username, email: req.body.email };
                    } else {
                        resolve({errors: "Those details do not match anything we have!"});
                }
    
            });

            //Sends all queries, send quit packet and quits gracefully
            con.end((err) => {
            
                if (err) throw err;

            });
        }); 
    })
}

//Hash password
exports.hashPassword = function (password) { 

    return(bcrypt.hashSync(password, saltRounds));

}

// ------------------ USER LIBRARY ------------------ //

exports.checkLibrary = function (req, res, info) {
    
    return new Promise(function(resolve, reject){
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
            
            console.log("[SONG INFO] Connected to database!");

            con.query("SELECT b.songID FROM users INNER JOIN library_item ON USERS.userID = library_item.userID WHERE a.username = " + info.username + " AND b.songID = " + info.song + ";", function (err, result, fields) {    
                
                if (err)
                {
                    //throw(err);
                    console.log("Didn't find a matching track!");
                    resolve({inLib: "NO"});
                    return;
                };

                resolve({inLib: "YES"});

            });

            //Sends all queries, send quit packet and quits gracefully
            con.end((err) => {
            
                if (err) throw err;

            });
        }); 
    })
}

