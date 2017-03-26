var jwt = require('jsonwebtoken');

var router = require('express').Router();

var StudentOrg = require('../models/StudentOrg');
var AcUser = require('../models/AcUser');
var AcEmail = require('../models/AcEmail');
var config = require('../config');
var emailer = require('../email');

// App posts to this end if this is a new or existing user
// Response should be json with {new: true} or {new: false}
router.post('/', function (req, res) {

  var user = req.body.user;

  if(user.email.indexOf('@umich.edu') === -1 && user.email != 'srok35@gmail.com') {
    res.json({success: false, msg: "Must be umich email"});
    return;
  }

  var googId = user.googId;
  var email = user.email;

  console.log("Got email in backend:", email);

  AcEmail.findOne({email: email}, function (err, acEmail) {
    if(acEmail) {
      AcUser.findOne({googId: googId}, function (err, acUser) {
          if(acUser) {
            var token = jwt.sign({googId: googId, type: 'ac'}, config.jwtSecret);
            res.json({success: true, new: false, type: 'ac', token: token});
          }
          else {
            AcUser.create({
              googId: user.googId,
              email: user.email,
              name: user.name
            },
            function (err) {
              if(err) {
                res.json({success: false, msg: err.message});
              }
              else {
                var token = jwt.sign({googId: googId, type: 'ac'}, config.jwtSecret);
                res.json({success: true, new: true, type: 'ac', token: token});

                emailer.sendAlumniCenterWelcome(user);
              }
            });
          }
      });
    }
    else {
      StudentOrg.findOne({repGoogId: googId}, function (err, studentOrg) {
        if(studentOrg) {
          var token = jwt.sign({googId: googId, type: 'so', status: studentOrg.status}, config.jwtSecret);
          res.json({success: true, new: false, type: 'so', token: token});
        }
        else {
          // Don't insert studentOrg into DB yet because we must get the org name from them on another request
          var token = jwt.sign({googId: googId, type: 'so', status: 'pending'}, config.jwtSecret);
          res.json({success: true, new: true, type: 'so', token: token});

          emailer.sendStudentOrgWelcome(user);
        }
      });
    }
  });
});

module.exports = router;