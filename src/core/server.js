var express = require('express');
var bodyParser = require('body-parser')
var app = express();

require('dotenv').config();
const PORT = process.env.PORT;

import routes from "../routes";

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

for(let route of routes){
  app[route.method](route.path, !route.middlewares ? [] : route.middlewares, route.route);
}

app.listen(PORT, async () => {
  console.log(`express  port ${PORT}`);
});