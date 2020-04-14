exports.myDateTime = function () { 
    return Date(); 
}

exports.sayHi = function (req, res, next) { 
    console.log("Hi!");

    console.log("I got user: " + req.body.username);

    if(req.body.username == "asd")
    {
        res.send({ error: true });
    }

    else
    {
        next();
    }
}

exports.showData = function (req, res) { 
    console.log(req.body);

    res.send({ status: 'okay'});
}
