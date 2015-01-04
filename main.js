var NUM_TEAMS = 8;
var NUM_ITERATIONS = 100;
var outcomes = [];
var procCount = 0;
var MAX_CNT_PER_TICK = 10;

var _ = require('underscore');
var parsedList = require('./htmlToJson.js')('./data/formResponses2.html');

console.log('Calculating', NUM_ITERATIONS, 'outcomes');

for (var idx=0; idx<NUM_ITERATIONS; idx++){

	var team2DList = require('./computeTeams.js')(_.shuffle(parsedList), NUM_TEAMS);

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
process.stdout.write('\n');

var minValue = _.min(outcomes, function(item){
	return item.stdev;
});
console.log('Minimum stdev: ', minValue.stdev);

var genderTotals = myTeamAnalytics.getGenderTotals();
var skillByGenderTotals = myTeamAnalytics.getSkillByGenderTotals();

// need to customize the following
require('./outputToPlotly.js')('iancarlson3000', 'ik1ayyqjkl', {
	size: NUM_TEAMS, 
	genderTotals: genderTotals,
	skillByGenderTotals: skillByGenderTotals
}, function(err){
	if (err){ 
		console.log('Error in Plotly: ', err);	
	}
});

// need to customize the following
var spreadsheetAuthInfo = {
	spreadsheetID: '1V_lQ5YNCSLV9pS4PuB-XoXmc9sD4RnMOwaC8gJ_rEig',
	worksheetID: 'od6',
	emailID: '645548898529-dpda3l2486rg903aakmq9438ok8q88k2@developer.gserviceaccount.com',
	keyFile: 'my-key-file.pem'
};

require('./outputToGDoc.js')(minValue.teamList, spreadsheetAuthInfo, function(err){
	if (err){
		console.log('Error in Google Spreadsheet: ', err);
	}
});