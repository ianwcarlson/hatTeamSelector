var underscore = require('underscore');

var parser = require('./htmlToJson.js');
var parsedList = parser('./data/formResponses1.html');

var girls = underscore.where(parsedList, {'Gender':'Female'});

var sortedListBySkill = underscore.sortBy(parsedList, function(listItem){
	return listItem['Ultimate Skill'];
});

// initialize team lists
var numTeams = 8;
var team2DList = [];
for (var i=0; i<numTeams; i++){
	team2DList.push([]);
}

function selectNewTeamClass(){
	var teamSelect = 0;
	var increment = 1;
	function selectNewTeam(){
		if (teamSelect === numTeams){
			increment -= 1;
		} else if (teamSelect === 0){
			increment += 1;
		}
		teamSelect += increment;
	}
	return {
		selectNewTeam: selectNewTeam
	};
}

// find all baggage players and insert into list

// create separate team list
// e.g., 
// [
//		[
//			{
//				"First Name": String,
//				"Last Name": String,
//				"Utimate Skill": Number,
//				"Gender": String,
//				"City": String
//				"State": String
//			},...
//		],...
//	]


// insert baggage players

// start add women to team list

debugger;