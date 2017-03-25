
var router = require('express').Router();

var StudentOrg = require('../../models/StudentOrg');

router.get('/all', function (req, res) {

  var pendingSOs = [];
  var approvedSOs = [];
  var rejectedSOs = [];

  StudentOrg.find({}, function (err, studentOrgs) {

    studentOrgs.forEach(function (so) {
      if(so.status === 'approved') {
        approvedSOs.push(so);
      }
      else if(so.status === 'pending'){
        pendingSOs.push(so);
      }
      else { // === 'rejected'
        rejectedSOs.push(so);
      }
    });

    res.json({success: true, pendingStudentOrgs: pendingSOs, approvedStudentOrgs: approvedSOs, rejectedStudentOrgs: rejectedSOs});
  });
});

router.get('/:studentOrgId/approve', function (req, res) {

  var _id = req.params.studentOrgId;
  StudentOrg.findById(_id, function (err, studentOrg) {
    if(studentOrg) {
      studentOrg.status = 'approved';
      studentOrg.save(function (err) {
        if(!err) {
          res.json({success: true});
        }
      });
    }
    else {
      res.json({success: false, msg: err});
    }
  });
});

router.get('/:studentOrgId/reject', function (req, res) {

  var _id = req.params.studentOrgId;
  StudentOrg.findById(_id, function (err, studentOrg) {
    if(studentOrg) {
      studentOrg.status = 'rejected';
      studentOrg.save(function (err) {
        if(!err) {
          res.json({success: true});
        }
      });
    }
    else {
      res.json({success: false, msg: err});
    }
  });
});

module.exports = router;