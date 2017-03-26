
var router = require('express').Router();

var AlumniRequest = require('../../models/AlumniRequest');
var StudentOrg = require('../../models/StudentOrg');
var AcUser = require('../../models/AcUser');

var emailer = require('../../email');

router.get('/all', function (req, res) {

  AlumniRequest.find({}, function (err, requests) {

    var newReqs = [];
    var pendingReqs = [];
    var fulfilledReqs = [];
    var rejectedReqs = [];

    requests.forEach(function (req) {

      if(req.status === 'new') newReqs.push(req);
      else if(req.status === 'pending') pendingReqs.push(req);
      else if(req.status === 'fulfilled') fulfilledReqs.push(req);
      else /* req.status === 'rejected' */ rejectedReqs.push(req);
    });

    res.json({success: true, newRequests: newReqs, pendingRequests: pendingReqs, fulfilledRequests: fulfilledReqs,
              rejectedRequests: rejectedReqs});
  });
});

router.get('/:alumniRequestId', function (req, res) {

  var _id = req.params.alumniRequestId;

  AlumniRequest.findById(_id, function (err, req) {

    res.json({success: true, request: req});
  });
});

router.get('/:alumniRequestId/handle', function (req, res) {

  var _id = req.params.alumniRequestId;
  AlumniRequest.findById(_id, function (err, req) {

    req.status = 'pending';
    req.save(function (err) {
      if(!err) {

        StudentOrg.findOne({repGoogId: req.studentOrgGoogId}, function (err, studentOrg) {

          emailer.sendRequestHandled(studentOrg, req);
          res.json({success: true});
        });
      }
      else {
        res.json({success: false, msg: err.message});
      }
    });
  });
});

router.get('/:alumniRequestId/fulfill', function (req, res) {

  var _id = req.params.alumniRequestId;
  var acGoogId = req.googId;

  AlumniRequest.findById(_id, function (err, req) {

    req.status = 'fulfilled';
    req.save(function (err) {
      if(!err) {
        StudentOrg.findOne({repGoogId: req.studentOrgGoogId}, function (err, studentOrg) {

          AcUser.findOne({repGoogId: acGoogId}, function (err, acUser) {

            emailer.sendRequestFulfilled(studentOrg, req, acUser);
            res.json({success: true});
          });
        });
      }
      else {
        res.json({success: false, msg: err.message});
      }
    });
  });
});

router.get('/:alumniRequestId/reject', function (req, res) {

  var _id = req.params.alumniRequestId;
  // Reason passed by url?reason='reason here'
  var reason = req.query.get('reason');
  AlumniRequest.findById(_id, function (err, req) {

    req.status = 'rejected';
    req.reasonForRejection = reason;
    req.save(function (err) {
      if(!err) {
        StudentOrg.findOne({repGoogId: req.studentOrgGoogId}, function (err, studentOrg) {

          emailer.sendRequestRejected(studentOrg, req, reason);
          res.json({success: true});
        });
      }
      else {
        res.json({success: false, msg: err.message});
      }
    });
  });
});

module.exports = router;