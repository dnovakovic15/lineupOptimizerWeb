var advanced = require('./advanced.js');
var simple = require('./simple.js');
const express = require('express');
const app = express();

function Player(advanced, simple){
  this.advanced = advanced;
  this.simple = simple;
}

app.get('/', function (req, res) {
  res.send("Check the Server!");
  var newPlayer = new Player(advanced.getAdvanced('nikola', 'jokic', advanced.send), simple.getSimple('nikola', 'jokic'));
  console.log(newPlayer);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});