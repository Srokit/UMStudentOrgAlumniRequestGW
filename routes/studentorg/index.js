
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

        if(req.path == "/user" && req.method == "POST" && decoded.status !== 'rejected') {
          // This is the only case where student org does not have to be verified yet
          req.googId = decoded.googId;
          next();
        }
        else {
          if(decoded.status == 'approved') {
            req.googId = decoded.googId;
            next();
          }
          else {
            res.json({success: false, msg: "Do not have access"});
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