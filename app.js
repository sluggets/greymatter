var express = require('express'),
 nunjucks = require('nunjucks'),
 MongoClient = require('mongodb').MongoClient,
 passport = require('passport'),
 LocalStrategy = require('passport-local').Strategy,
 cookieParser = require('cookie-parser'),
 bodyParser = require('body-parser'),
 session = require('express-session'),
 passportSession = require('passport-session'),
 bcrypt = require('bcrypt'),
 assert = require('assert'),
 flash = require('connect-flash'),
 validate = require('express-validation'),
 validation = require('./validation/add-user.js'),
 path = require('path'),
 addUser = require('./routes/addUser'),
 login = require('./routes/login'), 
 home = require('./routes/home'),
 sesh = require('./routes/sesh'),
 app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app
});


app.use(express.static(path.join(__dirname, '/public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'sluggets lucent',
                  resave: false,
                  saveUninitialized: false,
                  name: 'greymatter'
 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/add-user', addUser);
app.use('/login', login);
app.use('/home', home);
app.use('/sesh', sesh);

/*function hashPassword(passToCrypt) {
  bcrypt.genSalt(12, function(err, salt) {
    if (err)
    {
      return console.log(err);
    }

    bcrypt.hash(passToCrypt, salt, function(err, hash) {
      if (err)
      {
        return console.log(err);
      }
      
      console.log("hash inside func: " + hash);
      return hash;
    });
  });
}*/
/*passport.serializeUser(function(user, done) {
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
));*/
app.get('/', function(req, res) {
  res.render("test.html", { username: "Timothy!"});
});


/*app.get('/add-user', function(req, res) {
  res.render("addUser.html");
});*/

/*app.post('/add-user', validate(validation), function(req, res) {
  res.render("test.html", { appUser: req.body.username, appPass: req.body.password, appEmail: req.body.email });
  console.log(req.body);

  console.log("outside of func: " + hashPassword(req.body.password)); 

  //console.log("newHash: " + typeof(newHash));
  //MongoClient.connect('simpleroute')
});*/
app.use('/add-user', addUser);
/*app.post('/login',
  passport.authenticate('local', {successRedirect: '/',
                                  failureRedirect: '/',
                                  failureFlash: true })
);*/
app.listen(3000, function() {
  console.log('Example greymatter listening on port 3000!');
});

app.use(function(err, req, res, next) {
  if (err instanceof validate.ValidationError)
  {
    return res.status(err.status).json(err);
  }
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.use(function(req, res, next) {
  res.status(404).send("Cannot find that!");
});
