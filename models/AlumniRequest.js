var mongo = require('mongoose');

var alumniRequestSchema = new mongo.Schema({

  eventName: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  alumniName: String, // optional, will be set after fulfillment forsure
  alumniEmail: String, // optional, will be set after fulfillment
  eventDatetime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'new'
  },
  studentOrgGoogId: {
    type: String,
    required: true
  },
  acUserHandlingName: String, // optional
  reasonForRejection: String, // optional
});

module.exports = mongo.model('alumnirequest', alumniRequestSchema);