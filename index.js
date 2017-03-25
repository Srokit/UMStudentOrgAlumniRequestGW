// Starting point for node.js server

// node_modules requires

var express = require('express');
var mongo = require('mongoose');
var bodyParser = require('body-parser');

// My requires
var config = require('./config');
var routes = require('./routes');

// Setup servers and listeners
var app = express();

// To get req.body to be usable
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(routes);
app.use(express.static('./ng_app'));

mongo.connection.on('open', function () {
  console.log("Connected to mongo DB");
});

mongo.connection.on('error', function (err) {
  console.error("Error connecting to mongo DB");
  console.error(err);
});

// Setup database
mongo.connect(config.dbUri);

// Start looking for http requests
app.listen(config.port);

console.log("Listening on port " + config.port + " :)");