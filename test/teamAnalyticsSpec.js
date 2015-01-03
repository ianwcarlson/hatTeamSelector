var fs = require('fs');
var teamsData = JSON.parse(fs.readFileSync('test/data/inputTeamAnalytics.json'));

function countPlayers(input2DList){
	playerTotal = 0;
	input2DList.forEach(function(element){
		element.forEach(function(innerElement){
			playerTotal += 1;
		});
	});
	return playerTotal;
}

describe('How to test teamAnalytics module', function(){
	
	var numTeams = 4;
	var teamAnalytics = require('../teamAnalytics.js')(teamsData);	

	it('should make sure source data is ok', function(){
		expect(teamsData.length).toNotEqual(0);
		var numPlayers = countPlayers(teamsData);
		//verified 126 manually
		expect(numPlayers).toEqual(126);
	});
	
	it('should have the methods work properly', function(){
		var answers = require('./data/teamAnalyticsAnswers.js')
		var teamTotals = teamAnalytics.getTeamTotals();	
		expect(teamTotals).toEqual(answers.teamTotalsAnswer);			

		var stdDev = teamAnalytics.getStdev();				
		expect(stdDev).toEqual(answers.stdDevAnswer);

		var getGenderTotals = teamAnalytics.getGenderTotals();				
		expect(getGenderTotals).toEqual(answers.genderTotalsAnswer);

		var getSkillByGenderTotals = teamAnalytics.getSkillByGenderTotals();				
		expect(getSkillByGenderTotals).toEqual(answers.skillByGenderTotalsAnswer);
	});
});