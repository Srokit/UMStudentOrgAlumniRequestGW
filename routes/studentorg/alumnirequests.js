
var router = require('express').Router();

var AlumniRequest = require('../../models/AlumniRequest');
var StudentOrg = require('../../models/StudentOrg');
var emailer = require('../../email');

router.get('/all', function (req, res) {

  var googId = req.googId;

  var newReqs = [];
  var pendingReqs = [];
  var fulfilledReqs = [];
  var rejectedReqs = [];

  AlumniRequest.find({studentOrgGoogId: googId}, function (err, requests) {

    requests.forEach(function (req) {
      if(req.status === 'new') newReqs.push(req);
      else if(req.status === 'pending') pendingReqs.push(req);
      else if(req.status === 'fulfilled') fulfilledReqs.push(req);
      else rejectedReqs.push(req);
    });

    res.json({success: true, newRequests: newReqs, pendingRequests: pendingReqs, fulfilledRequests: fulfilledReqs,
              rejectedRequests: rejectedReqs});
  });
});

router.post('/new', function (req, res) {
  var request = req.body.request;
  var googId = req.googId;

  request.studentOrgGoogId = googId;
  request.status = 'new';

  AlumniRequest.create(request, function (err) {
    if(!err) {
      res.json({success: true});

      StudentOrg.findOne({repGoogId: googId}, function (err, studentOrg) {

        emailer.sendRequestReceived(studentOrg, request);
      });
    }
    else {
      res.json({success: false, msg: err.message});
    }
  });
});

router.get('/:requestId', function (req, res) {

  var _id = req.params.requestId;
  AlumniRequest.findById(_id, function (err, request) {
    res.json({success: true, request: request});
  });
});

module.exports = router;