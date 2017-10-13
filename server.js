const User = require("./userModel");
var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var MongoClient = require('mongodb').MongoClient;
var myConnection;

// serve pure static assets
app.use("/output", express.static('./output'))

app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.get("/select", (req, res) => {
    var url = 'mongodb://localhost:27017/jopo';
    MongoClient.connect(url, function(err, db) {
        // assert.equal(null, err);
        db.collection("users").insertOne({
            "name": "vinoth"
        })
        console.log("Connected correctly to server.");
        db.close();
    });
    console.log("jjj")
    res.sendFile(__dirname + "/index.html");
});

app.post("/api", (req, res) => {
    const doc = new User({
        userName: req.body.userName
    })
    doc.save();
    res.send(req.body.userName);
    //User.update({"userName": req.body.userName});
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});