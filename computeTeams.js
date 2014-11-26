exports.run = function(inputList, numTeams){

	var underscore = require('underscore');

	var conditionedPlayerList = distillPlayerList(
		underscore.shuffle(inputList));

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
	var sortedRemainingPlayerList = underscore.sortBy(remainingPlayerList, function(item){
		return item.skill;
	});
	sortedRemainingPlayerList.reverse();

	var remainingFemalePlayers = underscore.where(sortedRemainingPlayerList, {'gender': 'female'});
	var remainingMalePlayers = underscore.where(sortedRemainingPlayerList, {'gender': 'male'});
	// initialize team lists
	var numTeams = 8;
	var team2DList = [];
	for (var i=0; i<numTeams; i++){
		team2DList.push([]);
	}

	// fill up team side bars
	var sideBar2DList = [];
	for (var i=0; i<numTeams; i++){
		sideBar2DList.push([]);
	}
	underscore.each(sideBar2DList, function(element, idx, list){
		element.push({'female': [], 'male': []});
	})
	underscore.each(sortedBaggageList, function(element, index, list){
		var idx = selectNewTeam.getTeamSelect();
		divideGender(sideBar2DList[idx][0], element[0]);
		divideGender(sideBar2DList[idx][0], element[1]);
		selectNewTeam.selectNewTeam();
	})
	selectNewTeam.resetTeamIndex();

	loadTeams('female', remainingFemalePlayers);
	//selectNewTeam.resetTeamIndex();
	loadTeams('male', remainingMalePlayers);
	selectNewTeam.resetTeamIndex();


	//function definitions
	function loadTeams(gender, remainingPlayers){
		while (remainingPlayers.length > 0 || !areSideBarsEmpty(gender)){ // may need to count sideboard to make sure it's empty
			//underscore.each(outerElement, function(innerElement, innerIndex, list){
			var idx = selectNewTeam.getTeamSelect();
			// compare side board to remaining list
			var sideboardArray = sideBar2DList[idx][0][gender];
			if (sideboardArray.length === 0 || (remainingPlayers.length > 0 && 
				remainingPlayers[0].skill > sideboardArray[0].skill)){
				if (typeof remainingPlayers[0] !== 'undefined'){
					team2DList[idx].push(remainingPlayers[0]);
					remainingPlayers = remainingPlayers.slice(1);
				}
			} 
			else if (remainingPlayers.length === 0 || 
				(sideboardArray.length > 0 && remainingPlayers[0].skill <= sideboardArray[0].skill)){
				if (typeof sideboardArray[0] !== 'undefined'){
					team2DList[idx].push(sideboardArray[0]);
					sideBar2DList[idx][0][gender] = sideBar2DList[idx][0][gender].slice(1);
				}
			} 		
			selectNewTeam.selectNewTeam();
		}
	}

	function areSideBarsEmpty(gender){
		var empty = true;
		underscore.each(sideBar2DList, function(element, index, list){
			if (element[0][gender].length !== 0){
				empty = false;
			}	
		})
		return empty;
	}

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

	return team2DList;	
};