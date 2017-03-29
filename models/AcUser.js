
var mongo = require('mongoose');

var acUserSchema = new mongo.Schema({

  googId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

module.exports = mongo.model('acUser', acUserSchema);
