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
 assert = require('assert');


var router = express.Router();

router.get('/', function(req, res) {
  res.render("login.html");
});

router.post('/',   
    passport.authenticate('local', {successRedirect: '/home',
                                  failureRedirect: '/login',
                                  failureFlash: true,
                                  successFlash: 'Welcome man!'})
);
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    MongoClient.connect('mongodb://localhost:27017/simpleroute', function(err, db) {
      if (err)
      {
        return done(err);
      }

      db.collection('users').find({ 'username': username }).toArray(function(err, docs) {
        if (docs.length == 0)
        {
          return done(null, false, { messge: 'Incorrect username.' });
        }

        bcrypt.compare(password, docs[0]["password"], function (err, res) {
          if (!res)
          {
            return done(null, false, {message: 'Incorrect password.' });
          } 
          else
          {
            return done(null, docs[0]["username"]);
          }
        });
      });
    });

  }
));

module.exports = router;
