var mongo = require('mongoose');

var alumniRequestSchema = new mongo.Schema({

  // START Form fields
  eventName: {
    type: String,
    required: true
  },
  eventDescription: {
    type: String,
    required: true
  },
  eventDatetime: {
    type: String,
    required: true
  },
  numAlumni: {
    type: Number,
    required: true
  },
  descriptionOfAlumni: {
    type: String,
    required: true
  },
  needsToBeAlum: {
    type: Boolean,
    required: true
  },
  doesHaveFunding: {
    type: Boolean,
    required: true
  },
  // END Form fields

  // START fulfill form fields
  alumniNames: [String],
  alumniEmails: [String],
  // END Fulfill form fields
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