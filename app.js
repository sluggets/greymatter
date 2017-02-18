var express = require('express');
var nunjucks = require('nunjucks');
var app = express();

app.set('view engine', 'nunjucks');

app.get('/', function(req, res) {
  res.send("Hello Greymatter!");
});

app.listen(3000, function() {
  console.log('Example greymatter listening on port 3000!');
});
