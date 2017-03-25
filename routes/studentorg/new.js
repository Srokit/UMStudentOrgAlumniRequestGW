
var router = require('express').Router();

var StudentOrg = require('../../models/StudentOrg');

router.post('/', function (req, res) {

  var name = req.body.name;
  var planOfUse = req.body.planOfUse;
  var repInfo = req.body.repInfo;

  StudentOrg.create({
    repGoogId: repInfo.googId,
    repEmail: repInfo.email,
    repName: repInfo.name,
    orgName: name,
    planOfUse: planOfUse,
    approved: false
  }, function (err) {
    if(err) {
      res.json({success: false, msg: err.message});
    }
    else {
      res.json({success: true});
    }
  });
});

module.exports = router;