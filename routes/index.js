var user = require('./user');
var studentorg = require('./studentorg');
var acuser = require('./acuser');

var router = require('express').Router();

router.use('/user', user);
router.use('/studentorg', studentorg);
router.use('/acuser', acuser);

module.exports = router;