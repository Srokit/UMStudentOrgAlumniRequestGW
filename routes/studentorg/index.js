
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
        // Checks out
        next();
      }
      else {
        // This is an alumni center user
        res.json({success: false, msg: "Do not have access"});
      }
    }
  });
});

router.use('/orgname', require('./orgname'));

module.exports = router;