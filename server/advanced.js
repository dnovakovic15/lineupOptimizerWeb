const express = require('express');
var request = require('request');
var cheerio = require('cheerio');

var exports = module.exports = {};

var advancedStats = [];

// exports.getStats = function(first, last){
//     var advanced = getAdvanced(first, last);
//     console.log(advanced);
//     return advanced;
// }

exports.getAdvanced = function(first, last, callback){

    var letter = first.substring(0,1);
    var firstTwo = first.substring(0,2);
    var firstFive = last.substring(0,5);

    url = 'https://www.basketball-reference.com/players/' + letter + '/' + firstFive + firstTwo + '01/gamelog-advanced/2018/';

    request(url, function(error, response, html){
        // First we'll check to make sure no errors occurred when making the request
        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            var $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture
            var usage, rebounds, assists, minutes;
            var usage_array = [];
            var rebound_array = [];
            var assist_array = [];
            var minutes_array = [];

            // var json = { usage : "", rebounds : "", assists : "", minutes :  ""};

            $('.right[data-stat="usg_pct"]').filter(function(){
                var data = $(this);
                usage_array.push(data.text());
            });

            $('.right[data-stat="trb_pct"]').filter(function(){
                var data = $(this);
                rebound_array.push(data.text());
            });

            $('.right[data-stat="ast_pct"]').filter(function(){
                var data = $(this);
                assist_array.push(data.text());
            });

            $('.right[data-stat="mp"]').filter(function(){
                var data = $(this);
                minutes_array.push(data.text());
            });

            advancedStats.push(usage_array, rebound_array, assist_array, minutes_array);
            console.log('testing');
        } 
    })
    callback();
}

exports.send = function(){
    console.log(advancedStats);
    return advancedStats;
}

