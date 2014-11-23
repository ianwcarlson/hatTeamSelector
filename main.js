var computeTeams = require('./computeTeams.js');
var team2DList = computeTeams.run('./data/formResponses2.html');

var outputToCsv = require('./outputToCsv.js');
outputToCsv.writeCsv(team2DList);