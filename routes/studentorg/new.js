
var router = require('express').Router();

var StudentOrg = require('../../models/StudentOrg');

var emailer = require('../../email');

router.post('/', function (req, res) {

  var name = req.body.name;
  var planOfUse = req.body.planOfUse;
  var repInfo = req.body.repInfo;
  var orgType = req.body.orgType;
  var additionalComments = req.body.additionalComments;

  var newStudentOrg = {
    repGoogId: repInfo.googId,
    repEmail: repInfo.email,
    repName: repInfo.name,
    orgName: name,
    planOfUse: planOfUse,
    orgType: orgType,
    additionalComments: additionalComments
    // status will be set automatically by mongoose
  };

  StudentOrg.create(newStudentOrg, function (err) {
    if(err) {
      res.json({success: false, msg: err.message});
    }
    else {
      res.json({success: true});
      emailer.sendStudentOrgWelcome(newStudentOrg);
    }
  });
});

module.exports = router;