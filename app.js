const express = require('express');
const formidable = require('express-formidable');
const appRootPath = require('app-root-path');
const packageJson = require('./package.json');
const fs = require("fs");
const path = require('path');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(formidable());

app.get('*', function (req,res) {
    res.sendFile(path.join(appRootPath.toString(),"/public/index.html"));
})

// every second post request will return a 500, the other one a 200, for testing what will happen when the 
// server is down
let serverHealth = true;

app.post('*',function (req,res) {
        console.log("post from ", req.headers.host);
        console.log("request fields", req.fields);
        //console.log("request files", req.files);
        for (let file in req.files) {
            let tempName = req.files[file].path;
            let realName = req.files[file].name;
            console.log("request file",req.files[file].name)
            fs.renameSync(tempName,'./uploads/'+realName);
        }
            
        // To give the frontend time to show a spinner, the res get delayed.
        setTimeout( function () {
            switch (req.url) {
                case "ok": res.sendStatus(200).end(); break;
                case "fail": res.sendStatus(500).end(); break;
                default: if (serverHealth) {
                    res.sendStatus(200).end();
                } else {
                    res.sendStatus(500).end();
                }
                serverHealth = !serverHealth;
            }

        },1000);
})


app.listen(packageJson.port);

console.log(getTime()+" server running at :"+packageJson.port);

function getTime () {
    const date = new Date();
    return "["+date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds()+"]";
}