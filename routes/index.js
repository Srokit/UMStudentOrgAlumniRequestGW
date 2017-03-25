// requiring ./routes gives the router defined here
// points to other routers

var router = require('express').Router();

router.get('/', function (req, res) {

  res.send('Hello world!');
});

module.exports = router;
