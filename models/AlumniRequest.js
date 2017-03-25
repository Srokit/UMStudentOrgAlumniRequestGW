var mongo = require('mongoose');

var alumniRequestSchema = new mongo.Schema({

  eventName: String,
  subject: String,
  alumniName: String, // optional
  eventDatetime: Date,
  status: String,
  studentOrgGoogId: String
});

module.exports = mongo.model('alumnirequest', alumniRequestSchema);