var express = require("express");
var mongoose = require("mongoose");

// Init DB
mongoose.Promise = global.Promise;
var dbURL = "mongodb://localhost:27017/jopo";
mongoose.connect(dbURL, { useMongoClient: true });
mongoose.connection.on("error", function(err) {
    if (err) throw err;
})
mongoose.connection.on("open", function() {
    console.log("Successfully connected to db:", dbURL)
})

// Init app
var port = 3000;
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Serve static assets
app.use("/dist", express.static("./dist"))

// API's
var User = require("./user");
var Jobs = require("./jobs");

app.get("/api/users", (req, res) => {
    User.find({}).exec(function(err, users) {
        if (err) {
            res.send("No users found")
        } else {
            res.json(users);
        }
    })
});

app.get("/api/jobpost", (req, res) => {
    Jobs.find({}).exec(function(err, jobs) {
        if (err) {
            res.send("No job details found")
        } else {
            res.json(jobs);
        }
    })
});

app.get("/api/usersdel", (req, res) => {
    User.find({}).exec(function(err, users) {
        if (err) {
            res.send("No users found")
        } else {
            res.json([]);
        }
    })
});

app.post("/api/jobpost", (req, res) => {
    const doc = new Jobs({ 
        _id: new mongoose.Types.ObjectId,
        companyName: req.body.companyName,
        designation: req.body.designation,
        details: req.body.details,
        yearsExp: req.body.yearsExp 
    })
    doc.save(function(err, user) {
        if (err) {
            res.status(503).send({
               message: "Couldn't save to server."
            });
        } else {
            res.send({ 
                jobId:user._id,
                companyName: req.body.companyName,
                designation: req.body.designation,
                details: req.body.details,
                yearsExp: req.body.yearsExp });
            }
    });
});

app.put("/api/updatejob", (req, res) => {
    const doc = { 
        _id: req.body.jobId,
        companyName: req.body.companyName,
        designation: req.body.designation,
        details: req.body.details,
        yearsExp: req.body.yearsExp 
    };
    Jobs.update({_id: req.body.jobId}, doc,function(err, user) {
        if (err) {
            res.status(503).send({
               message: "Couldn't save to server."
            });
        } else {
            res.send({ 
                jobId:req.body.jobId,
                companyName: req.body.companyName,
                designation: req.body.designation,
                details: req.body.details,
                yearsExp: req.body.yearsExp });
            }
    });
});


app.post("/api/users", (req, res) => {
    const doc = new User({ userName: req.body.userName })
    doc.save(function(err, user) {
        if (err) {
            res.status(503).send({
               message: "Couldn't save to server."
            });
        } else {
            res.send({ userName: req.body.userName });
        }
    });
});

// Serve root
app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
