var computeTeams = require('./computeTeams.js');

var NUM_TEAMS = 8;
var NUM_ITERATIONS = 10000;
var outcomes = [];
var procCount = 0;
var MAX_CNT_PER_TICK = 10;

var parser = require('./htmlToJson.js');
var parsedList = parser('./data/formResponses2.html');

console.log('Calculating', NUM_ITERATIONS, 'outcomes');

for (var idx=0; idx<NUM_ITERATIONS; idx++){

	var team2DList = computeTeams.run(parsedList, NUM_TEAMS);

	var teamAnalyticsModule = require('./teamAnalytics.js');
	var myTeamAnalytics = teamAnalyticsModule(team2DList);
	var totals = myTeamAnalytics.getTeamTotals();
	var stdev = myTeamAnalytics.getStdev();
	outcomes.push({
		teamList: team2DList,
		stdev: stdev
	});
	if (procCount===MAX_CNT_PER_TICK){
		procCount = 0;
		process.stdout.write('.');
	} else {
		procCount += 1;
	}
	
}
var _ = require('underscore');
var minValue = _.min(outcomes, function(item){
	return item.stdev;
});
debugger;
var outputToCsv = require('./outputToCsv.js');

outputToCsv.writeCsv(team2DList);