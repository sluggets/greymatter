var express = require('express'),
 validate = require('express-validation'),
 session = require('express-session');

var router = express.Router();

router.get('/', function(req, res) {
  var sess = req.session;
  var currentUser = req.session.passport.user;
  for (var item in req.session.passport)
  {
    console.log("this is.." + item + ": " + req.session.passport[item]);
  }
  res.render("home.html", { appUser: currentUser });
});
router.post('/', function(req, res) {
  res.render("home.html");
});

module.exports = router;
