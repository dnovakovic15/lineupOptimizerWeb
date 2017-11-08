var advanced = require('./advanced.js');
var simple = require('./simple.js');
const express = require('express');
const app = express();

var exports = module.exports = {};

function Player(advanced, simple, dkPoints){
  this.advanced = advanced;
  this.simple = simple;
  this.dkPoints = dkPoints;
}


// app.get('/', function (req, res) {
//   res.send("Check the Server!");
//   fetchStats();
// });

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// });

var newPlayer = new Player(0,0,[]);

var fetchStats = function(first, last, resolve, counter){
  var advancedStats = advanced.getAdvanced(first, last, setPlayer, 
  function(){
    var simpleStats = simple.getSimple(first, last, setPlayer, resolve);
  });
}



var setPlayer = function(stats, identity, callback, resolve, simple){
  if(identity == 0){
    newPlayer.advanced = stats;
    simple();
  }
  else{
    newPlayer.simple = stats;
    dkPoints(newPlayer, callback, resolve);
  }
}

function dkPoints(player, callback, resolve){
  for(var i = 0; i < player.simple.length - 1; i++){
    var points = parseFloat((player.simple[0][i])) + parseFloat((player.simple[1][i] * 1.25)) + parseFloat(player.simple[2][i] * 1.5) + parseFloat(player.simple[3][i] * 0.5) + parseFloat(player.simple[4][i] * 2) + parseFloat(player.simple[5][i] * 2) - parseFloat(player.simple[6][i] * 0.5);
    newPlayer.dkPoints[i] = points;
  }
  resolve(newPlayer);
  // callback();
}

exports.getPlayer = function(first, last, counter){
  return new Promise(function(resolve, reject){
    fetchStats(first, last, resolve, counter);
  });
}

