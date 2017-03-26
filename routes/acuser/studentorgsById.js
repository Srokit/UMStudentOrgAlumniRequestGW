var router = require('express').Router();

var StudentOrg = require('../../models/StudentOrg');

router.get('/:studentOrgId', function (req, res) {

  var _id = req.params.studentOrgId;
  StudentOrg.findById(_id, function (err, studentOrg) {
    res.json({success: true, studentOrg: studentOrg});
  });
});

module.exports = router;