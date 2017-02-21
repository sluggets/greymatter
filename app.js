var express = require('express'),
 nunjucks = require('nunjucks'),
 MongoClient = require('mongodb').MongoClient,
 passport = require('passport'),
 LocalStrategy = require('passport-local').Strategy,
 cookieParser = require('cookie-parser'),
 bodyParser = require('body-parser'),
 session = require('express-session'),
 passportSession = require('passport-session'),
 app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'sluggets lucent',
                  resave: false,
                  saveUninitialized: false
 }));
app.use(passport.initialize());
app.use(passport.session());

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
    User.findOne({ username: username }, function(err, user) {
      if (err)
      {
        return done(err);
      }

      if (!user)
      {
        return done(null, false, { messge: 'Incorrect username.' });
      }

      if (!user.validPassword(password))
      {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    });
  }
));
app.get('/', function(req, res) {
  res.render("test.html", { username: "Timothy!"});
});

app.get('/add-user', function(req, res) {
  res.render("addUser.html");
});

app.post('/add-user', function(req, res) {
  res.render("test.html", { appUser: req.body.username, appPass: req.body.password });
  console.log(req.body);
});
app.post('/login',
  passport.authenticate('local', {successRedirect: '/',
                                  failureRedirect: '/',
                                  failureFlash: true })
);
app.listen(3000, function() {
  console.log('Example greymatter listening on port 3000!');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.use(function(req, res, next) {
  res.status(404).send("Cannot find that!");
});
