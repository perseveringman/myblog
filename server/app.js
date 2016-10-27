const express = require('express');
const app = express();
// var db = require('./db');
var routes = require('./routes.js');
const bodyParser = require('body-parser');
const hostname = "0.0.0.0";
const port = 3000;
app.all("*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

app.listen(port,hostname, () => {
  console.log(`Server running at port:${port}/`);
});