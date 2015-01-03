var fs = require('fs');
var teamsData = JSON.parse(fs.readFileSync('./data/inputComputeTeams.json'));

function countPlayers(input2DList){
	playerTotal = 0;
	input2DList.forEach(function(element){
		element.forEach(function(innerElement){
			playerTotal += 1;
		});
	});
	return playerTotal;
}

describe('How to test computeTeams module', function(){
	
	var numTeams = 4;
	var computedTeams = require('../computeTeams.js')(teamsData, numTeams);	
	
	it('should not return null data', function(){
		expect(computedTeams.length).toNotEqual(0);
		expect(computedTeams.length).toEqual(numTeams);
	});

	it('should not miss anybody, even after shuffling and retrying', function(){
		var _ = require('underscore');
		computedTeams = require('../computeTeams.js')(_.shuffle(teamsData), numTeams);

		for (var i=0; i<20; i++){
			var numPlayers = countPlayers(computedTeams);
			// verified the correct number was 15 in json input file
			expect(numPlayers).toEqual(15);
		}
	});
});