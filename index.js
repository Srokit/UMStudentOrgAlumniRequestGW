// Starting point for node.js server

// node_modules requires

var express = require('express');

// My requires
var config = require('./config');
var routes = require('./routes');

// Setup servers and listeners
var app = express();

app.use(express.static('./ng_app'));

// Start looking for http requests
app.listen(config.port);

console.log("Listening on port " + config.port + " :)");