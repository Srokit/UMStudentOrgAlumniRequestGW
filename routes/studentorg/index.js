
var jwt = require('jsonwebtoken');

var router = require('express').Router();

var config = require('../../config');

// Use json web tokens as authentication for student org routes
router.use(function (req, res, next) {

  var token = req.headers['user-token'];

  jwt.verify(token, config.jwtSecret, function (err, decoded) {
    if(err) {
      res.json({success: false, msg: "Do not have access"});
    }
    else {
      if(decoded.type === 'so') {
        console.log(req.path);
        if(req.path == "/new" && req.method == "POST" && decoded.status !== 'rejected') {
          // This is the only case where student org does not have to be verified yet
          req.googId = decoded.googId;
          console.log(req.googId);
          next();
        }
        else {
          if(decoded.status === 'approved') {
            console.log(req.googId);
            req.googId = decoded.googId;
            next();
          }
          else {
            if(decoded.status === 'pending') {
              // This is a special property that lets the client know they have to wait for approval at studentorgconsole
              res.json({waitForApproval: true});
            }
            else { // decoded === 'rejected'
              res.json({success: false, msg: "Do not have access"});
            }

          }
        }
      }
      else {
        // This is an alumni center user
        res.json({success: false, msg: "Do not have access"});
      }
    }
  });
});

router.use('/new', require('./new'));
router.use('/alumnirequests', require('./alumnirequests'));

module.exports = router;