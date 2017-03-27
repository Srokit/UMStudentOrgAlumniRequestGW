var user = require('./user');
var studentorg = require('./studentorg');
var acuser = require('./acuser');
var admin = require('./admin');

var router = require('express').Router();

router.use('/user', user);
router.use('/studentorg', studentorg);
router.use('/acuser', acuser);
router.use('/admin', admin);

module.exports = router;