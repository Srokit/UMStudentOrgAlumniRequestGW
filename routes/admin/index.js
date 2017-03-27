var path = require('path');

var router = require('express').Router();

var AcEmail = require('../../models/AcEmail');
var config = require('../../config');

router.get('/', function (req, res) {

  res.sendFile(path.join(__dirname,'index.html'));
});

router.post('/', function (req, res) {

  var acEmail = req.body.acEmail;
  var adminPass = req.body.adminPass;

  if(adminPass != config.adminPass) {
    res.redirect('/admin?noauth=true');
    console.log(req);
    console.log(adminPass);
    console.log(config.adminPass);
    return;
  }

  AcEmail.create({email: acEmail}, function (err) {
    if(!err) {
      res.redirect('/admin?success=true');
    }
    else {
      res.redirect('/admin?success=false');
    }
  });
});

module.exports = router;