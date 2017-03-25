
var mongo = require('mongoose');

var acEmailSchema = new mongo.Schema({

  email: String

});

module.exports = mongo.model('acEmail', acEmailSchema);