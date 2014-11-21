module.exports = function(inputPlayerList){
	var underscore = require('underscore');

	var baggageList = underscore.reject(inputPlayerList, function(listItem){
		if (listItem['Name of Baggage Player (person you want to play with)'] === ''){
			return true;
		} else {
			return false;
		}
	});

	debugger;

	return baggageList;
}