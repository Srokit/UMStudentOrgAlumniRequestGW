
var mongo = require('mongoose');

var acEmailSchema = new mongo.Schema({

  email: {
    type: String,
    required: true
  }

});

module.exports = mongo.model('acemail', acEmailSchema);