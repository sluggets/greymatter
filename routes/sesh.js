var express = require('express'),
 validate = require('express-validation'),
 session = require('express-session');

var router = express.Router();


router.get('/', function(req, res) {
  var sess = req.session;
  var currentUser = req.session.passport.user;
  res.render("sesh.html", { appUser: currentUser });
});

module.exports = router;
