var express = require('express');

var app = express();

app.use(express.logger());
app.use(function(req, res, next) {
  if (req.url.match(/\/$/)) {
    req.url = req.url + "index";
  }
  if (!req.url.match(/\./)) {
    req.url = req.url + ".json";
    res.set('Content-Type', 'application/json');
  } else {
    res.set('Content-Type', 'text/plain');
  }
  next();
});
app.use(express.static('api'));
app.use(function(req, res, next){
  res.send(404, 'Sorry cant find that!');
});

app.listen(process.env.PORT || 3000);