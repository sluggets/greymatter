var express = require('express'),
 session = require('express-session');

var router = express.Router();

router.post('/', function(req, res) {
  res.render("home.html");
});

module.exports = router;
