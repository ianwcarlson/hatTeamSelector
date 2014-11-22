var underscore = require('underscore');

var parser = require('./htmlToJson.js');
var parsedList = parser('./data/formResponses2.html');

var girls = underscore.where(parsedList, {'Gender':'Female'});

var sortedListBySkill = underscore.sortBy(parsedList, function(listItem){
	return listItem['Ultimate Skill'];
});

var conditionedPlayerList = distillPlayerList(parsedList);

var selectNewTeam = selectNewTeamClass();

var findBaggagePairs = require('./findBaggagePairs.js');
var baggageList = findBaggagePairs(conditionedPlayerList);

// flatten and sort by skill level in descending order
var sortedBaggageList = underscore.sortBy(baggageList, function(listItem){
	return listItem[0].skill + listItem[1].skill;
});
sortedBaggageList.reverse();
var flattenedBaggageList = [];
underscore.each(sortedBaggageList, function(element, index, list){
	flattenedBaggageList.push(element[0]);
	flattenedBaggageList.push(element[1]);
})


// sort by skill level in descending order
var remainingPlayerList = underscore.difference(conditionedPlayerList, flattenedBaggageList);
var sortedRemainingPlayerlist = underscore.sortBy(remainingPlayerList, function(item){
	return item.skill;
});
sortedRemainingPlayerlist.reverse();

var remainingFemalePlayers = underscore.where(sortedRemainingPlayerlist, function(item){
	item.gender === 'female';
});
var remainingMalePlayers = underscore.where(sortedRemainingPlayerlist, function(item){
	item.gender === 'male';
});

// initialize team lists
var numTeams = 8;
var team2DList = [];
for (var i=0; i<numTeams; i++){
	team2DList.push([]);
}

// fill up team side bars
var sideBar2DList = team2DList;
underscore.each(sortedBaggageList, function(element, index, list){
	var idx = selectNewTeam.getTeamSelect();
	sideBar2DList[idx].push({'female': [], 'male': []});
	divideGender(sideBar2DList[idx][0], element[0]);
	divideGender(sideBar2DList[idx][0], element[1]);
	selectNewTeam.selectNewTeam();
})

debugger;

// start loading up the team lists
underscore.each(team2DList, function(outerElement, index, list){
	underscore.each(outerElement, function(innerElement, index, list){

	}
})


function divideGender(team, player){
	if (player.gender === 'female'){
		team.female.push(player);
	} else if (player.gender === 'male'){
		team.male.push(player);
	} else {
		console.log('gender not recognized');
	}
}

function selectNewTeamClass(){
	var teamSelect = 0;
	var increment = 1;
	var firstTime = false;
	function selectNewTeam(){
		if (teamSelect === numTeams-1){
			if (firstTime){
				increment = 0;
				firstTime = false;
			} else {
				increment = -1;
				firstTime = true;
			}
		} else if (teamSelect === 0){
			if (firstTime){
				increment = 0;
				firstTime = false;
			} else {
				increment = 1;
				firstTime = true;
			}
		}
		teamSelect += increment;
	}
	return {
		selectNewTeam: selectNewTeam,
		getTeamSelect: function(){
			return teamSelect;
		},
		resetTeamIndex: function(){
			teamSelect = 0;
		}
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

function distillPlayerList(rawPlayerList){
	newList = [];
	underscore.each(rawPlayerList, function(element, index, list){
		var newPlayer = {};
		newPlayer.firstName = element['First Name'].toLowerCase();
		newPlayer.lastName = element['Last Name'].toLowerCase();
		newPlayer.state = element['State'].toLowerCase();
		newPlayer.skill = parseInt(element['Ultimate Skill'], 10);
		newPlayer.speed = parseInt(element['Ultimate Speed'], 10);
		newPlayer.baggage = element['Name of Baggage Player (person you want to play with)'].toLowerCase();
		newPlayer.gender = element['Gender'].toLowerCase();
		newPlayer.bothDays = element['Will you attend both days'].toLowerCase();
		newList.push(newPlayer);
	})
	return newList;
}	

// insert baggage players

// start add women to team list

debugger;