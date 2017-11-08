var stats = require('./stats.js');
var advanced = require('./advanced.js');
var simple = require('./simple.js');
const express = require('express');
const app = express();

var exports = module.exports = {};


app.get('/', function (req, res) {
  res.send("Check the server!");
  findValue();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

function Player(first, last, price, dkPoints){
    this.first = first;
    this.last = last;
    this.price = price;
    this.dkPoints = dkPoints;
}

var counter = 0;
var playersWithStats = [];
var emptyArray = [];
findValue();

function findValue(){
    var player0 = new Player('evan', 'turner', 5000, emptyArray);
    var player1 = new Player('ed', 'davis', 5000, emptyArray);
    var player2 = new Player('draymond', 'green', 5000, emptyArray);

    var players = [player0, player1, player2];

    if(counter < players.length){
        console.log(players[counter].first + " " + players[counter].last);

        stats.getPlayer(players[counter].first, players[counter].last, players[counter].price)
            .then((res) => {
                var points = res.dkPoints.slice(0);
                var newPlayer = new Player(players[counter].first, players[counter].last, players[counter].price, points);
                newPlayer.advanced = res.advanced;
                newPlayer.simple = res.simple;
                playersWithStats.push(newPlayer);
                counter++;
                findValue();
            })
            .catch((err) => {
                console.error(err.message);
        });
    }
    else{
        var dk = 0;

        for(var i = 0; i < playersWithStats.length; i++){
            for(var j = playersWithStats.length; j >= playersWithStats.length - 2; j--){
                dk = dk + playersWithStats[i].dkPoints[j];
            }

            dkAverage = dk/3;
            dk = 0;
            var dkValue = dkAverage / playersWithStats[i].price * 1000;
            playersWithStats[i].dkValue = dkValue;
        }
        
        var sortedPlayers = playersWithStats.sort(function(a, b){
            return b.dkValue - a.dkValue;
        })

        for(var i in sortedPlayers){
            console.log(sortedPlayers[i].first + ': ' + sortedPlayers[i].dkValue);
        }
    }
}

