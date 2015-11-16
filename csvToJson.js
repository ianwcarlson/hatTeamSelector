var fs = require('fs');
var csv = require('fast-csv');
var q = require('q');
var defaultPath = "./data/Albuturkey 2015 Responses - Form Responses 1.csv";


module.exports = function(inputFilePath){
    var deferred = q.defer();
    var stream = fs.createReadStream(inputFilePath);
    var dataArray = [];

    csv
        .fromStream(stream, {headers : true})
        .on("data", function(data){
            //console.log(data);
            dataArray.push(data);
        })
        .on("end", function(){
            console.log("done parsing CSV");
            deferred.resolve(dataArray);
        });

    return deferred.promise;
};

