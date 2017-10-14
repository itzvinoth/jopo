var express = require("express");
var app = express();
var port = 3000;
var User = require("./userModel");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/jopo';
mongoose.connect(url, {useMongoClient: true});
// serve pure static assets
app.use("/output", express.static('./output'))

app.get("/users", (req, res) => {
    User.find({}).exec(function(err, users) {
        if (err) {
            res.send("No users found")
        } else {
            res.json(users);
        }
    })
});

app.post("/api", (req, res) => {
    // console.log(req.body.userName);
    const doc = new User({ userName: req.body.userName })
    doc.save();
    res.send({ userName: req.body.userName });
});

app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});