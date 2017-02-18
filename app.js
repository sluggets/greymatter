var express = require('express'),
 nunjucks = require('nunjucks'),
 MongoClient = require('mongodb').MongoClient,
 app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app
});
//app.set('view engine', 'nunjucks');

app.get('/', function(req, res) {
  res.render("test.html", { username: "Timothy!"});
});

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
