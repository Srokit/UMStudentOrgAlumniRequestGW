
var mongo = require('mongoose');

var acUserSchema = new mongo.Schema({

  googId: String,
  name: String,
  email: String
});

module.exports = mongo.model('acUser', acUserSchema);
