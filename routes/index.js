var user = require('./user');
var studentorg = require('./studentorg');

var router = require('express').Router();

router.use('/user', user);
router.use('/studentorg', studentorg);

module.exports = router;