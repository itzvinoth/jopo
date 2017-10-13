var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var MongoClient = require('mongodb').MongoClient;

// serve pure static assets
app.use("/output", express.static('./output'))

app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

/*app.get('/', function(req, res) {
    var url = 'mongodb://localhost:27017/jopo';
    MongoClient.connect(url, function(err, db) {
        db.getCollection('users').find({}).then(eachOne => {
            res.json(eachOne);
            
        });
        console.log(db);
    });
});*/

app.post("/api", (req, res) => {
    console.log(req.body.userName);
    var url = 'mongodb://localhost:27017/jopo';
    MongoClient.connect(url, function(err, db) {
        // assert.equal(null, err);
        db.collection("users").insertOne({"userName": req.body.userName})
        console.log("Connected correctly to server.");
        db.close();
    });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});