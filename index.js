// Starting point for node.js server

// node_modules requires

var express = require('express');
var sio = require('socket.io');
var http = require('http');

// My requires
var config = require('./config');
var routes = require('./routes');

// Setup servers and listeners
var app = express();
var server = http.Server(app);

var sioApp = sio(server);

// Setup routes
app.use(routes);

// Start looking for http requests
app.listen(config.port);

console.log("Listening on port " + config.port + " :)");