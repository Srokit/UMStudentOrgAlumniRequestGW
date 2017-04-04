var mongo = require('mongoose');

var studentOrgSchema = new mongo.Schema({

  repGoogId: {
    type: String,
    required: true
  },
  repName: {
    type: String,
    required: true
  },
  repEmail: {
    type: String,
    required: true
  },
  // START Form fields
  orgName: {
    type: String,
    required: true
  },
  orgType: {
    type: String,
    required: true
  },
  planOfUse: {
    type: String,
    required: true
  },
  additionalComments: {
    type: String,
    required: true
  },
  // END Form fields
  status: {
    type: String,
    default: 'pending'
  }, // approved, rejected, or pending
  reasonForRejection: String //optional
});

module.exports = mongo.model('studentOrg', studentOrgSchema);
