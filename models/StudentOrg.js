var mongo = require('mongoose');

var studentOrgSchema = new mongo.Schema({

  repGoogId: String,
  repName: String,
  repEmail: String,
  orgName: String,
  planOfUse: String,
  approved: Boolean
});

module.exports = mongo.model('studentOrg', studentOrgSchema);
