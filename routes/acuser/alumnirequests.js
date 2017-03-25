
var router = require('express').Router();

var AlumniRequest = require('../../models/AlumniRequest');

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

router.get('/:alumniRequestId/handle', function (req, res) {

  var _id = req.params.alumniRequestId;
  AlumniRequest.findById(_id, function (err, req) {

    req.status = 'pending';
    req.save(function (err) {
      if(!err) {
        res.json({success: true});
      }
      else {
        res.json({success: false, msg: err.message});
      }
    });
  });
});

router.get('/:alumniRequestId/fulfill', function (req, res) {

  var _id = req.params.alumniRequestId;
  AlumniRequest.findById(_id, function (err, req) {

    req.status = 'fulfilled';
    req.save(function (err) {
      if(!err) {
        res.json({success: true});
      }
      else {
        res.json({success: false, msg: err.message});
      }
    });
  });
});

router.get('/:alumniRequestId/reject', function (req, res) {

  var _id = req.params.alumniRequestId;
  AlumniRequest.findById(_id, function (err, req) {

    req.status = 'rejected';
    req.save(function (err) {
      if(!err) {
        res.json({success: true});
      }
      else {
        res.json({success: false, msg: err.message});
      }
    });
  });
});

module.exports = router;