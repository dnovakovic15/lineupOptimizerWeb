var fs = require('fs');
var csv = require('csv');
var transform = require('stream-transform');

var command = process.argv[2];

var outputMap = {};

fs.createReadStream('DKSalaries.csv')
  .pipe(csv.parse())
  .pipe(csv.transform(function(record){
     return record.map(function(value){
       return value.toUpperCase()
     });
  }))
  .pipe(csv.stringify())
  .pipe(process.stdout);



