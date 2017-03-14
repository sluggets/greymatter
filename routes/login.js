var express = require('express'),
 validate = require('express-validation'),
 MongoClient = require('mongodb').MongoClient,
 passport = require('passport'),
 bcrypt = require('bcrypt'),
 LocalStrategy = require('passport-local').Strategy,
 cookieParser = require('cookie-parser'),
 bodyParser = require('body-parser'),
 session = require('express-session'),
 passportSession = require('passport-session'),
 flash = require('connect-flash');
 assert = require('assert'),
 app = express();


var router = express.Router();

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

router.get('/', function(req, res) {
  if (req.flash)
  {
    console.log("has it");
    console.log(req.failureflash);
  }
  res.render("login.html");
});

router.post('/',   
    passport.authenticate('local', {successRedirect: '/home',
                                  failureRedirect: '/login',
                                  failureFlash: "Failed Dude!",
                                  successFlash: 'Welcome man!'})
);
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // i might need to call to mongodb to
  // do this part?
  done(null, user);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    MongoClient.connect('mongodb://localhost:27017/simpleroute', function(err, db) {
      if (err)
      {
        return done(err);
      }
      console.log("Successfully connected to simpleroute");

      db.collection('users').find({ 'username': username }).toArray(function(err, docs) {
        console.log(docs);
        console.log("password " + password);
        if (docs.length == 0)
        {
          return done(null, false, { message: 'Incorrect username.' });
        }

        bcrypt.compare(password, docs[0]["password"], function (err, res) {
          if (!res)
          {
            return done(null, false, {message: 'Incorrect password.' });
          } 
          else
          {
            console.log("Successfully entered pass!....douche");
            return done(null, docs[0]["username"]);
          }
        });
      });
    });

  }
));

module.exports = router;
