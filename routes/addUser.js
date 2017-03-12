var express = require('express'),
 validate = require('express-validation'),
 bcrypt = require('bcrypt'),
 MongoClient = require('mongodb').MongoClient,
 assert = require('assert'),
 validation = require('../validation/add-user.js');

var router = express.Router();

function hashAndStorePassword(passToCrypt, usrName, database) {
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
      // store pass in db
      database.collection('users').updateOne({ 'username': usrName }, { $set: { 'password': hash } });
      // close the db
      database.close();
      return;
      //return hash;
    });
  });
}

router.get('/', function(req, res) {
  res.render("addUser.html");
});

MongoClient.connect('mongodb://localhost:27017/simpleroute', function(err, db) {
    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");
    router.post('/', validate(validation), function(req, res) {
      // need to check to see if user or email already exists!
      db.collection('users').insertOne({ 'username': req.body.username, 'email': req.body.email});      
      res.render("test.html", { appUser: req.body.username, appPass: req.body.password, appEmail: req.body.email });
      console.log(req.body);
      hashAndStorePassword(req.body.password, req.body.username, db);
    });
});

/*router.post('/', validate(validation), function(req, res) {
  res.render("test.html", { appUser: req.body.username, appPass: req.body.password, appEmail: req.body.email });
  console.log(req.body);
  var result = hashPassword(req.body.password);
  console.log("outside of func: " + result); 

  //console.log("newHash: " + typeof(newHash));
  //MongoClient.connect('simpleroute')
});*/

module.exports = router;
