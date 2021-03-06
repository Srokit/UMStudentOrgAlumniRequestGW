
var router = require('express').Router();

var StudentOrg = require('../../models/StudentOrg');
var AcUser = require('../../models/AcUser');

var emailer = require('../../email');

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

router.get('/:studentOrgGoogId', function (req, res) {

  var googId = req.params.studentOrgGoogId;

  StudentOrg.findOne({repGoogId: googId}, function (err, studentOrg) {

    res.json({success: true, studentOrg: studentOrg});
  });
});

router.get('/:studentOrgId/approve', function (req, res) {

  var _id = req.params.studentOrgId;
  var acGoogId = req.googId;
  StudentOrg.findById(_id, function (err, studentOrg) {
    if(studentOrg) {

      AcUser.findOne({googId: acGoogId}, function (err, acUser) {
        studentOrg.status = 'approved';
        studentOrg.save(function (err) {
          if(!err) {

            emailer.sendStudentOrgApproved(studentOrg, acUser);
            res.json({success: true});
          }
        });
      });
    }
    else {
      res.json({success: false, msg: err});
    }
  });
});

router.get('/:studentOrgId/reject', function (req, res) {

  var _id = req.params.studentOrgId;
  var reason = req.query['reason'];
  StudentOrg.findById(_id, function (err, studentOrg) {
    if(studentOrg) {
      studentOrg.status = 'rejected';
      studentOrg.reasonForRejection = reason;
      studentOrg.save(function (err) {
        if(!err) {

          emailer.sendStudentOrgRejected(studentOrg, reason);
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