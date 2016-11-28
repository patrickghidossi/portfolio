var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
var sightings = [];


var PORT = process.env.port || 3000;
console.log(PORT);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	console.log(req.url);
	next();
});

app.use(session({
	secret: "pokemon",
	resave: false,
	saveUninitialized: false
}));

var addRoutes = require("./routes_pages.js");
addRoutes(app);

var addAPIRoutes = require('./routes_api.js');
addAPIRoutes(app, sightings);

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.use(express.static("public"));

app.use(function(req, res, next) {
	res.status(404);
	res.send("It's not very effective");
});

app.listen(PORT, function() {
  console.log("Get money on Port " + PORT);
});
