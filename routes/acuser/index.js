
var jwt = require('jsonwebtoken');

var router = require('express').Router();

var config = require('../../config');

router.use(function (req, res, next) {

  var token = req.headers['user-token'];
  jwt.verify(token, config.jwtSecret, function (err, decoded) {
     if(err) {
       res.json({success: false, msg: "Do not have access"});
     }
     else {
       if(decoded.type === 'ac') {
         next();
       }
       else {
         res.json({success: false, msg: "Do not have accesss"});
       }
     }
  });
});

router.use('/studentorgs', require('./studentorgs'));

module.exports = router;