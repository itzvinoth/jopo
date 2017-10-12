const User = require("./userModel");
var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/jopo", {useMongoClient: true});

// serve pure static assets
app.use("/output", express.static('./output'))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/api", (req, res) => {
  const doc = new User({ userName: req.body.userName })
  doc.save();
  res.send('success');
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});