var mongo = require('mongoose');

var alumniRequestSchema = new mongo.Schema({

  eventName: String,
  subject: String,
  alumniName: String, // optional
  alumniEmail: String, // optional
  eventDatetime: Date,
  status: String,
  studentOrgGoogId: String,
  reasonForRejection: String // optional
});

module.exports = mongo.model('alumnirequest', alumniRequestSchema);