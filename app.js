    const express = require('express');
    const app = express();

    const fs = require('fs');
    const jsonParser = express.json();
    // var bodyParser = require("body-parser");
    // var jsonParser = bodyParser.json();

    app.use(express.static(__dirname + "/"));

    app.post('/registration', jsonParser, (req,res)=> {
        if (!req.body) throw Error('reg error')
        let nameUser = req.body.name;
        let passwordUser = req.body.password;
    let user = {name: nameUser, password: passwordUser};

        let data = fs.readFileSync('users.json', 'utf-8');
        let users = JSON.parse(data);
        let result = null;
        
        for (let i = 0; i < users.length; i++) {
            if (nameUser == users[i].name) result = 'exist';
        }
    if (!result) {
        users.push(user);
        result = 'saved';
        }
    let finishedData = JSON.stringify(users);
    fs.writeFileSync('users.json', finishedData)

    res.send(result);
    });


    app.post('/login', jsonParser, (req,res)=> {
        if (!req.body) throw Error('login error')
        let nameUser = req.body.name;
        let passwordUser = req.body.password;
    let user = {name: nameUser, password: passwordUser};

        let data = fs.readFileSync('users.json', 'utf-8');
        let users = JSON.parse(data);
        let result = null;
            for (let i = 0; i < users.length; i++) {
            if (nameUser == users[i].name && passwordUser == users[i].password)  result = 'okUser';
        }

    if (!result) {
        result = 'noSuchUser';
        }
    let finishedData = JSON.stringify(users);
    fs.writeFileSync('users.json', finishedData)

    res.send(result);
    });

    app.listen(3000, function() {
        'server works...';
    });