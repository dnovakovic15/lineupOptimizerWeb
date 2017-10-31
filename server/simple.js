const express = require('express');
var request = require('request');
var cheerio = require('cheerio');

var exports = module.exports = {};

exports.getSimple = function(first, last){

    var letter = first.substring(0,1);
    var firstTwo = first.substring(0,2);
    var firstFive = last.substring(0,5);

    url = 'https://www.basketball-reference.com/players/' + letter + '/' + firstFive + firstTwo + '01/gamelog/2018/';

    request(url, function(error, response, html){
        // First we'll check to make sure no errors occurred when making the request
        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            var $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture
            var points, rebounds, assists, threes, steals, blocks, to;
            var points_array = [];
            var rebound_array = [];
            var assist_array = [];
            var threes_array = [];
            var steals_array = [];
            var blocks_array = [];
            var to_array = [];

            var simpleStats = [];
            // var json = { usage : "", rebounds : "", assists : "", minutes :  ""};

            $('.right[data-stat="pts"]').filter(function(){
                var data = $(this);
                points_array.push(data.text());
            });

            $('.right[data-stat="trb"]').filter(function(){
                var data = $(this);
                rebound_array.push(data.text());
            });

            $('.right[data-stat="ast"]').filter(function(){
                var data = $(this);
                assist_array.push(data.text());
            });

            $('.right[data-stat="fg3"]').filter(function(){
                var data = $(this);
                threes_array.push(data.text());
            });

            $('.right[data-stat="stl"]').filter(function(){
                var data = $(this);
                steals_array.push(data.text());
            });

            $('.right[data-stat="blk"]').filter(function(){
                var data = $(this);
                blocks_array.push(data.text());
            });

            $('.right[data-stat="tov"]').filter(function(){
                var data = $(this);
                to_array.push(data.text());
            });

            simpleStats.push(points_array, rebound_array, assist_array, threes_array, steals_array, blocks_array, to_array);
            return simpleStats;
        }
    })
}
